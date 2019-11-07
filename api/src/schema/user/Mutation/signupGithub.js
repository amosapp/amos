import {R, H, validation, CONST, rp} from 'common'

const getUserByUsername = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`,

createGhAccount = `
  create (u:User {username: $username, created: datetime()})
  -[:AUTHENTICATED_WITH]->
  (gh:GhAccount {userGhId: $userGhId})
  return u
`,

attachEmail = `
  match (u: User {username: $username})
  with u
  create (u)
  -[:HAS_EMAIL]->
  (e: Email {email: $email})
`,

signupGithub = async (_, {input}, {session}) => {
  const

  {ghAccessToken, username} = input,

  /* Validation */
  [] = [await validation.username.validate (username, {abortEarly: false})],

  /* Check if username is free */
  {records: usernames} = await session.run (getUserByUsername, {username}),
  [] = [H.assert (R.isEmpty (usernames)) (CONST.username_taken (username))],

  getUser = {
    uri: `https://api.github.com/user`,
    headers: {
      'Authorization': `token ${ghAccessToken}`,
      'User-Agent': `Request-Promise`
    },
    json: true
  },

  userGh = await rp (getUser),
  userGhId = userGh?.id,

  // TODO: query params
  // TODO: Error handling

  {records: [user]} = await session.run (createGhAccount, {userGhId, username}),

  userId = user.get (`u`).identity.low,
  getEmails = R.mergeRight (getUser) ({
    'uri': `https://api.github.com/user/emails`,
  }),

  [_email] = (await rp (getEmails))
    |> R.filter (R.propEq (`primary`) (true)) (#),

  email = _email?.email,
  [] = [H.isNotNilOrEmpty (email) && await session.run (attachEmail, {username, email})],

  message = await H.createToken (process.env.JWT_SECRET, {sub: userId})

  return {message}
}

export default H.wrapInResponse (signupGithub)