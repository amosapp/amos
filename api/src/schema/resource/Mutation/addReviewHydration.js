import {H, R, normalizeUrl, CONST} from 'common'

const THRESHOLD_TOPIC = 0.1

export const

match = `
  match (r:Resource {link: $link}) return r
`,

createResource = `
  create (r: Resource)
  set r = $input
  set r.noVotesTopics = 0
  set r.noVotesPrerequisites = 0
  return r
`,

amosGameTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $topics as topicName
  with r, toLower (topicName) as topicNameLower
  match (t: Topic)
  unwind t.names as name
  with toLower (name) as nameLower, r, t
  where topicNameLower = nameLower
  with r, t
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {type: "TOPIC"})-[:FOR_TOPIC]->(t)
  with g, t
  optional match (u:User)-[:VOTED_ON]->(g)
  optional match (a:AnonymousUser)-[:VOTED_ON_ANONYMOUS]->(g)
  with g, t, count (u) as noVotesAuthorized, count (a) as noVotesAnonymous
  return g, t, noVotesAuthorized + noVotesAnonymous as noVotes
`,
/* Doesn't work :( */
// on match return 1
// on create return 0

authorized = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  match (u: User) where id (u) = toInteger ($userId)
  unwind $topicGames as topicGameId
  match (topicGame: AmosGame) where id (topicGame) = toInteger (topicGameId)
  merge (u)-[:VOTED_ON]->(topicGame)
    on create
      set r.noVotesTopics = r.noVotesTopics + 1
  with r
  return r
`,

updateTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $consensedTopicIds as topicId
  match (t: Topic) where id (t) = toInteger (topicId)
  merge (r)-[:HAS_TOPIC {created: datetime()}]->(t)
`

const addReviewHydration = async (_, {input}, {session, user}) => {
  H.assert (user.admin) (CONST.authorized_endpoint)

  const
  userId = user?.id,

  /* Normalize two urls */
  _input = R.has (`url_main`) (input)
    ? R.over (R.lensProp (`url_main`)) (x => normalizeUrl (x, {stripWWW: false})) (input)
    : input,

  __input = R.has (`url_goodreads`) (_input)
    ? R.over (R.lensProp (`url_goodreads`)) (x => normalizeUrl (x, {stripWWW: false})) (_input)
    : _input,

  /* Ok this has to be refactored :D */
  ___input = R.omit ([`topics`]) (__input),

  /* Create resource */
  {records: [_resource]} = await session.run (createResource, {input: ___input}),

  resourceId = _resource.get (`r`).identity.low,

  /* Create Topic AmosGame */
  topicGames = do {
    const {records} = await session.run (amosGameTopics, {resourceId, topics: __input.topics})
    R.map (r => ({
      gameId: r.get (`g`).identity.low,
      topicId: r.get (`t`).identity.low,
      noVotes: r.get (`noVotes`).low
    })) (records)
  },

  games = {topicGames},

  /* gamesIds is an obj of arrays */
  gamesIds = R.map (R.pluck (`gameId`)) (games),

  /* Attach AmosGame's to user */
  {records: [resource]} = await session.run (authorized, {userId, ...gamesIds, resourceId}),

  {noVotesTopics: {low: noVotesTopics}} = resource.get (`r`).properties,

  /* cool word!
   * (comes from `consensus` :-))
   */
  consensedTopicIds = R.reduce ((acc, {topicId, noVotes}) => (
    noVotesTopics / (noVotes + 1) <= 1 / THRESHOLD_TOPIC
      ? R.append (topicId) (acc)
      : acc
  )) ([]) (topicGames)

  /* Set new topics/prerequisites */
  await session.run (updateTopics, {resourceId, consensedTopicIds})
}

export default H.wrapInResponse (addReviewHydration)