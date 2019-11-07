import {H} from 'common'
import getDriver from './get-driver'
import schema from '../schema'

const driver = getDriver()

const context = async ({req}) => do {
  const session = driver.session()
  const {headers} = req
  const user = await H.decode (driver, headers.authorization)
  const ip = headers[`x-forwarded-for`] || req.connection.remoteAddress

  const ctx = {
    driver,
    session,
    headers,
    user,
    ...(headers.authorization ? null : {ip}),
    cypherParams: {
      currentUserId: user?.id,
    },
  }
  ctx
}

export default {
  context,
  schema,
  playground: true,
  introspection: true,
  // TODO: Change
  allowUndefinedInResolve: true,
}