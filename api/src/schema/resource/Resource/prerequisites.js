import {R, H} from 'common'

const getPrerequisites = `
match (r: Resource)-[h:HAS_PREREQUISITE]->(ag: AmosGame)-[:FOR_TOPIC]->(t: Topic)
where id (r) = toInteger ($resourceId)
return r,ag,t
`

const prerequisites = async ({_id}, _, {session}) => do {
  const {records} = await session.run (getPrerequisites, {resourceId: _id}),
  amosGames = R.map (rec => rec.get (`ag`).properties) (records),
  topics = R.map (rec => rec.get (`t`).properties) (records),
  _amosGames = R.map (H.over (`level`) (R.prop (`low`))) (amosGames),
  __amosGames = R.map (H.over (`strength`) (R.prop (`low`))) (_amosGames)
  R.zipWith ((ag, t) => ({...ag, topic: t})) (__amosGames) (topics)
}

export default (prerequisites)