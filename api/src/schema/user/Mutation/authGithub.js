import {R, H, rp} from 'common'

const matchUserGhId = `
  match (u: User)
  -[:AUTHENTICATED_WITH]->
  (gh: GhAccount {userGhId: $userGhId})
  return u
`,

getUserByEmail = `
  match (u: User)
  -[:HAS_EMAIL]->
  (e: Email {email: $email})
  return u
`,

createGhAccount = `
  match (u: User {username: $username})
  with u
  create (u)
  -[:AUTHENTICATED_WITH]->
  (gh:GhAccount {userGhId: $userGhId})
  return u
`,

authGithub = async (_, {input: {ghCode}}, {session}) => {
  const

  qs = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: ghCode
  },

  getGhAccessToken = {
    uri: `https://github.com/login/oauth/access_token`,
    method: `POST`,
    qs,
    json: true
  },

  data = await rp (getGhAccessToken),
  ghAccessToken = data?.access_token,

  getUser = {
    uri: `https://api.github.com/user`,
    headers: {
      'Authorization': `token ${ghAccessToken}`,
      'User-Agent': `Request-Promise`
    },
    json: true
  },

  user = await rp (getUser),
  userGhId = user?.id,

  {records: [result]} = await session.run (matchUserGhId, {userGhId}),
  message = H.isNotNilOrEmpty (result)
    ? do {
      /* User has a GhAccount */
      const userId = result.get (`u`).identity.low,
      token = await H.createToken (process.env.JWT_SECRET, {sub: userId})
      /* Fsr this fails unless it's named first */
      const res = [`token`, token]
      res
    }
    : do {
      /* User doesn't have a GhAccount,
      check if they have another account */
      const getEmails = R.mergeRight (getUser) ({
        'uri': `https://api.github.com/user/emails`,
      }),

      [_email] = (await rp (getEmails))
        |> R.filter (R.propEq (`primary`) (true)) (#),

      email = _email?.email

      const res = H.isNotNilOrEmpty (email)
        ? do {
          const {records: [_user]} = await session.run (getUserByEmail, {email})
          const _res = H.isNotNilOrEmpty (_user)
            ? do {
              /* User doesn't have GhAccount but they have another one */
              const {username} = _user.get (`u`).properties
              await session.run (createGhAccount, {username, userGhId})
              const userId = _user.get (`u`).identity.low,
              token = await H.createToken (process.env.JWT_SECRET, {sub: userId})
              const __res = [`token`, token]
              __res
            }
            : do {
              /* No user with this email */
              [`ghAccessToken`, ghAccessToken]
            }
          _res
        }
        : do {
          [`ghAccessToken`, ghAccessToken]
        }

      res
    }

  return {message}
}

export default H.wrapInResponse (authGithub)