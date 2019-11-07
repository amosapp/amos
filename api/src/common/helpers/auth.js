import * as R from 'ramda'
import jwt from 'jsonwebtoken'

export const createToken = async (secret, user) => await jwt.sign(user, secret, {expiresIn: `90d`})

export const decode = async (driver, authorizationHeader) => {
  if (!authorizationHeader) return null
  const token = R.replace (`Bearer `) (``) (authorizationHeader)
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET),
    id = decoded.sub,
    {roles: [admin]} = decoded,
    session = driver.session(),
    query = `
      MATCH (u:User) where id(u) = toInteger ($id)
      RETURN u
      LIMIT 1
    `,
    {records} = await session.run(query, {id})
    session.close()
    const _user = records[0].get (`u`),
    user = {..._user.properties, id: _user.identity.low}
    return {
      token,
      ...user,
      admin,
    }
  }
  catch (err) {
    return null
  }
}
