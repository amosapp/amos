import {H, rp} from 'common'

const matchUserFbId = `
  match (u: User)
  -[:AUTHENTICATED_WITH]->
  (fb: FbAccount {userFbId: $userFbId})
  return u
`,

getUserByEmail = `
  match (u: User)
  -[:HAS_EMAIL]->
  (e: Email {email: $email})
  return u
`,

createFbAccount = `
  match (u:User {username: $username})
  with u
  create (u)
  -[:AUTHENTICATED_WITH]->
  (fb:FbAccount {userFbId: $userFbId})
  return u
`,

authFacebook = async (_, {input: {fbAccessToken}}, {session}) => {
  const

  {data: {user_id: userFbId}} = await rp (
    /* eslint-disable max-len */
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
  ) |> JSON.parse,

  {records: [result]} = await session.run (matchUserFbId, {userFbId}),

  message = H.isNotNilOrEmpty (result)
    ? do {
      /* User has a FbAccount */
      const userId = result.get (`u`).identity.low,
      token = await H.createToken (process.env.JWT_SECRET, {sub: userId})
      /* Fsr this fails unless it's named first */
      const res = [`token`, token]
      res
    }
    : do {
      /* User doesn't have FbAccount */
      const {email} = await rp (
        `https://graph.facebook.com/me/?access_token=${fbAccessToken}&fields=email`
      ) |> JSON.parse,
      {records: [user]} = await session.run (getUserByEmail, {email})
      user
        ? do {
          /* User has another account */
          const username = user.get (`u`).properties.username
          const userId = user.get (`u`).identity.low
          await session.run (createFbAccount, {username, userFbId})
          const token = await H.createToken (process.env.JWT_SECRET, {sub: userId})
          const res = [`token`, token]
          res
        }
        : [`fbAccessToken`, fbAccessToken]
    }

  return {message}
}

export default H.wrapInResponse (authFacebook)