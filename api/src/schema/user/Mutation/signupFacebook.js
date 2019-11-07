import {R, H, validation, CONST, rp} from 'common'

const matchUser = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`

const createAccount = `
  create (u:User {username: $username, created: datetime()})
  -[:AUTHENTICATED_WITH]->
  (fb:FbAccount {userFbId: $userFbId})
  return u
`

const attachEmail = `
  match (u: User {username: $username})
  with u
  create (u)
  -[:HAS_EMAIL]->
  (e: Email {email: $email})
`

const signupFacebook = async (_, {input}, {session}) => {
  const

  {fbAccessToken, username} = input,

  /* Validation */
  [] = [await validation.username.validate (username, {abortEarly: false})],

  /* Check if username is free */
  {records: usernames} = await session.run (matchUser, {username}),
  [] = [H.assert (R.isEmpty (usernames)) (CONST.username_taken (username))],

  // TODO: query params
  // TODO: Error handling
  {data: {user_id: userFbId}} = await rp (
    /* eslint-disable max-len */
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
  ) |> JSON.parse,

  {records: [user]} = await session.run (createAccount, {userFbId, username}),
  userId = user.get (`u`).identity.low,

  {email} = await rp (
    `https://graph.facebook.com/me/?access_token=${fbAccessToken}&fields=email`
  ) |> JSON.parse,

  [] = [H.isNotNilOrEmpty (email) && await session.run (attachEmail, {username, email})],

  message = await H.createToken (process.env.JWT_SECRET, {sub: userId})

  return {message}
}

export default H.wrapInResponse (signupFacebook)