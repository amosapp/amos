import {H, R, bcrypt, CONST, validation} from 'common'

const getUsername = `
  match (u: User)
  where u.username = $username
  return u
`,

getUserByEmail = `
  match (u: User)
  -[:HAS_EMAIL]->
  (e: Email {email: $email})
  return u
`,

getLocalAccountById = `
  match (u: User)
  -[:AUTHENTICATED_WITH]->
  (l: LocalAccount)
  where id (u) = toInteger ($userId)
  return l
`,

createLocalAccount = `
  match (u: User {username: $username})
  with u
  create (u)
  -[:AUTHENTICATED_WITH]->
  (l: LocalAccount {hashedPassword: $hashedPassword})
  with u
  return u
`,

saveUser = `
  create (e: Email {email: $email})
  <-[:HAS_EMAIL]-
  (u: User {username: $username, created: datetime()})
  -[:AUTHENTICATED_WITH]->
  (l: LocalAccount {hashedPassword: $hashedPassword})
  return u
`,

signup = async (_, {input}, {session}) => {
  const

  /* Validation */
  [] = [await validation.signup.validate (input, {abortEarly: false})],
  {username, email, password} = input,

  /* Check if email is registered */
  {records: [user]} = await session.run (getUserByEmail, {email}),

  _user = H.isNotNilOrEmpty (user)
    ? do {
      /* Check if user has local account */
      const userId = user.get (`u`).identity.low,
      {records: [localAccount]} = await session.run (getLocalAccountById, {userId})

      H.assert (R.isNil (localAccount)) (CONST.email_taken)

      /* Usernames should match too */
      const realUsername = user.get (`u`).properties.username
      H.assert (R.equals (username) (realUsername)) (CONST.wrong_username)

      /* Hash password */
      const hashedPassword = await bcrypt.hash (password, 12)

      /* Create local account */
      await session.run (createLocalAccount, {username, hashedPassword})
      user
    }
    : do {
      /* User doesn't have an account */
      /* Check if username is free */
      const {records: [_username]} = await session.run (getUsername, {username})
      H.assert (R.isNil (_username)) (CONST.username_taken (username))

      /* Hash password */
      const hashedPassword = await bcrypt.hash (password, 12)

      /* Save user to db! */
      const {records: [__user]} = await session.run (saveUser, {username, email, hashedPassword})
      __user
    }

  const id = _user.get (`u`).identity.low,

  /* Grant jwt */
  /* `amos` is ADMIN (can add new topics) */
  message = username === `amos`
    ? await H.createToken (process.env.JWT_SECRET, {roles: [`ADMIN`], sub: id})
    : await H.createToken (process.env.JWT_SECRET, {sub: id})

  return {message}
}

export default H.wrapInResponse (signup)