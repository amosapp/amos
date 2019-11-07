import {H, CONST} from 'common'

const

_1 = `
  match (p)
  where $parent in p.names
  with p
  match (c)
  where $child in c.names
  with p,c
  create (p)<-[:IS_PART_OF {created: datetime()}]-(c)
  return c 
`,

addIsPartOf = async (_, {input}, {session, user}) => {
  H.assert (user.admin) (CONST.authorized_endpoint)
  await session.run (_1, input)
}

export default H.wrapInResponse (addIsPartOf)