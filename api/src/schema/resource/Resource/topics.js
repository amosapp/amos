import {R} from 'common'

const getTopics = `
match (r: Resource)-[h:HAS_TOPIC]->(t: Topic)
where id (r) = toInteger ($resourceId)
return r,t
`

const topics = async ({_id}, _, {session}) => {
  const {records} = await session.run (getTopics, {resourceId: _id})
  return R.map (rec => rec.get (`t`).properties) (records)
}

export default (topics)