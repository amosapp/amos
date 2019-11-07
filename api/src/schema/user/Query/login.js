import {
  H, R, CONST, bcrypt, validation
} from 'common'

const getUserByEmail = `
  match (u: User)
  -[:HAS_EMAIL]->
  (e: Email {email: $email}) 
  return u
`,

getUserByUsername = `
  match (u: User {username: $username})
  return u
`,

getHashedPassword = `
  match (u: User {username: $username})
  -[:AUTHENTICATED_WITH]->(l: LocalAccount)
  return l.hashedPassword as hashedPassword
`,

login = async (_, {input: {usernameOrEmail, password}}, {session}) => {
  const

  /* Is valid email? */
  isEmail = await validation.email.isValid (usernameOrEmail),

  /* Get query args */
  args = isEmail
    ? [getUserByEmail, {email: usernameOrEmail}]
    : do {
      await validation.username.validate (usernameOrEmail, {abortEarly: false})
      const res = [getUserByUsername, {username: usernameOrEmail}]
      res
    },

  /* Don't validate password */

  /* Get user */
  {records: [user]} = await session.run (...args),

  /* Check if user exists */
  [] = [H.assert (H.isNotNil (user)) (CONST.cant_find_user (isEmail) (usernameOrEmail))],

  /* Check if user has local account */
  username = user.get (`u`).properties.username,
  {records: [result]} = await session.run (getHashedPassword, {username})
  H.assert (H.isNotNil (result)) (CONST.no_local_account)

  const hashedPassword = result.get (`hashedPassword`),

  /* Check if password is correct */
  correctPassword = await bcrypt.compare (password, hashedPassword),
  [] = [H.assert (correctPassword) (CONST.incorrect_password)],

  id = user.get (`u`).identity.low,

  /* Grant jwt */
  /* `amos` is ADMIN (can add new topics) */
  message = R.includes ([`amos`, `amos@solvio.org`]) (usernameOrEmail)
    ? await H.createToken (process.env.JWT_SECRET, {roles: [`ADMIN`], sub: id})
    : await H.createToken (process.env.JWT_SECRET, {sub: id})

  return {message}
}

export default H.wrapInResponse (login)