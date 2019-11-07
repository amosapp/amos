/* eslint-disable max-lines */
import {H, R, normalizeUrl, CONST} from 'common'
const metascraper = require (`metascraper`)([
  require (`metascraper-title`)()
])

import got from 'got'

export const

match = `
  match (r:Resource {link: $link}) return r
`,

createResource = `
  create (r: Resource {
    link: $link,
    title: $title,
    noVotesTopics: 0,
    noVotesPrerequisites: 0
  })
  with r
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

amosGamePrerequisites = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $prerequisites as p
  with r, toLower (p.topic) as topicNameLower, p
  match (t: Topic)
  unwind t.names as name
  with toLower (name) as nameLower, r, t, p
  where topicNameLower = nameLower
  with r, t, p
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {
    type: "PREREQUSIITE",
    level: toInteger (p.level),
    strength: toInteger (p.strength)
  })-[:FOR_TOPIC]->(t)
  with g
  optional match (u:User)-[:VOTED_ON]->(g)
  optional match (a:AnonymousUser)-[:VOTED_ON_ANONYMOUS]->(g)
  with g, count (u) as noVotesAuthorized, count (a) as noVotesAnonymous
  return g, noVotesAuthorized + noVotesAnonymous as noVotes
`,

authorized = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  match (u: User) where id (u) = toInteger ($userId)
  unwind $topicGames as topicGameId
  match (topicGame: AmosGame) where id (topicGame) = toInteger (topicGameId)
  merge (u)-[:VOTED_ON]->(topicGame)
    on create
      set r.noVotesTopics = r.noVotesTopics + 1
  with u, r
  unwind $prerequisiteGames as prerequisiteGameId
  match (prerequisiteGame: AmosGame) where id (prerequisiteGame) = toInteger (prerequisiteGameId)
  merge (u)-[:VOTED_ON]->(prerequisiteGame)
    on create
      set r.noVotesPrerequisites = r.noVotesPrerequisites + 1
  return r
`,
// topicGame.noVotes = topicGame.noVotes + 1

guest = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  merge (u:AnonymousUser {ip: $ip})
  with u, r
  unwind $topicGames as topicGameId
  // Attach AnonymousUser to AmosGame's
  match (topicGame: AmosGame) where id (topicGame) = toInteger (topicGameId)
  merge (u)-[:VOTED_ON_ANONYMOUS]->(topicGame)
    on create
      set r.noVotesTopics = r.noVotesTopics + 1
      set r.created = datetime()
  with u, r
  unwind $prerequisiteGames as prerequisiteGameId
  match (prerequisiteGame: AmosGame) where id (prerequisiteGame) = toInteger (prerequisiteGameId)
  merge (u)-[:VOTED_ON_ANONYMOUS]->(prerequisiteGame)
    on create
      set r.noVotesPrerequisites = r.noVotesPrerequisites + 1
      set r.created = datetime()
  with r
  return r
`,
// prerequisiteGame.noVotes = prerequisiteGame.noVotes + 1

updateTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $consensedTopicIds as topicId
  match (t: Topic) where id (t) = toInteger (topicId)
  merge (r)-[:HAS_TOPIC {created: datetime()}]->(t)
`,

updatePrerequisites = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $consensedPrerequisiteIds as prerequisiteId
  match (g: AmosGame) where id (g) = toInteger (prerequisiteId)
  merge (r)-[:HAS_PREREQUISITE {created: datetime()}]->(g)
`

const addReview = async (_, {input}, {session, ip, user}) => {
  // TODO: Add validation

  const
  {topics, prerequisites} = input,
  /* Check either topics or prerequisites are provided */
  [] = [
    H.assert
    (H.isNotNilOrEmpty (topics) || H.isNotNilOrEmpty (prerequisites))
    (CONST.no_topic_or_prerequisite)
  ],
  userId = user?.id,

  /* Normalize url */
  links = R.map (x => normalizeUrl (x, {stripWWW: false})) (input.links),
  // TODO: Generalize
  _link = links[0],
  /* Get html page with HTTP request */
  {body: html, url} = await got (_link),
  /* Again normalize new url */
  link = normalizeUrl (url, {stripWWW: false}),

  /* See if resource exists */
  {records: resources} = await session.run (match, {link}),

  _createResource = async () => {
    /* Get title from html page */
    const {title} = await metascraper ({html, url})
    /* Create resource */
    const {records: [resource]} = await session.run (createResource, {link, title})
    return resource.get (`r`)
  },

  resource = R.isEmpty (resources)
    ? await _createResource()
    : resources[0].get (`r`),

  {identity: {low: resourceId}} = resource,

  /* Condtionally create Topic AmosGame */
  topicGames = H.isNotNilOrEmpty (topics)
    ? do {
      const {records} = await session.run (amosGameTopics, {resourceId, topics})
      R.map (r => ({
        gameId: r.get (`g`).identity.low,
        topicId: r.get (`t`).identity.low,
        noVotes: r.get (`noVotes`).low
      })) (records)
    }
    : [],

  /* Condtionally create Prerequisite AmosGame */
  prerequisiteGames = H.isNotNilOrEmpty (prerequisites)
    ? do {
      const {records} = await session.run (amosGamePrerequisites, {resourceId, prerequisites})
      R.map (r => ({
        gameId: r.get (`g`).identity.low,
        noVotes: r.get (`noVotes`).low
      })) (records)
    }
    : [],

  games = {topicGames, prerequisiteGames},

  /* gamesIds is an obj of arrays */
  gamesIds = R.map (R.pluck (`gameId`)) (games),

  /* Attach AmosGame's to user */
  {} = userId
    ? await session.run (authorized, {userId, ...gamesIds, resourceId})
    : await session.run (guest, {ip, ...gamesIds, resourceId}),

  noVotesTopics = resource.properties.noVotesTopics.low,
  noVotesPrerequisites = resource.properties.noVotesPrerequisites.low,
  /*
   * cool word!
   * (comes from `consensus` :-))
   */
  consensedTopicIds = R.reduce ((acc, {topicId, noVotes}) => (
    noVotesTopics / (noVotes + 1) <= 1 / CONST.threshold_topic
      ? R.append (topicId) (acc)
      : acc
  )) ([]) (topicGames),

  consensedPrerequisiteIds = R.reduce ((acc, {gameId, noVotes}) => (
    noVotesPrerequisites / (noVotes + 1) <= 1 / CONST.threshold_prerequisite
      ? R.append (gameId) (acc)
      : acc
  )) ([]) (prerequisiteGames)

  /* Set new topics/prerequisites */
  await session.run (updateTopics, {resourceId, consensedTopicIds})
  await session.run (updatePrerequisites, {resourceId, consensedPrerequisiteIds})
}

export default H.wrapInResponse (addReview)