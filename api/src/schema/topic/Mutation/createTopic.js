import {H, CONST} from 'common'

const

_1 = `
  merge (t:Topic {names: $names, created: datetime()})
  return t
`,

createTopic = async (_, {input}, {session, user}) => {
  H.assert (user.admin) (CONST.authorized_endpoint)
  await session.run (_1, input)
}

export default H.wrapInResponse (createTopic)