import {
  R, ApolloClient, gql, fetch, createHttpLink, setContext,
  InMemoryCache, Promise, parser, topics
} from './common'

const

[uri] = R.props
([`API_URL`])
(process.env),

// createTopic (input: CreateTopicInput!): Boolean!
// addIsPartOf (input: AddIsPartOfInput!): Boolean!

createTopicMutation = gql`
  mutation CreateTopic ($input: CreateTopicInput!) {
    createTopic (input: $input) {
      success
    }
  }
`,

addIsPartOfMutation = gql`
  mutation AddIsPartOf ($input: AddIsPartOfInput!) {
    addIsPartOf (input: $input) {
      success
    }
  }
`,

// const createRange = arr => R.range (0) (R.length (arr))

createTopic = (client) => async ({metadata: {names}}) => {
  await client.mutate ({mutation: createTopicMutation, variables: {input: {names}}})
},

createRelation = (client) => async ({child, parent}) => {
  await client.mutate ({mutation: addIsPartOfMutation, variables: {input: {child, parent}}})
}

export default async (token) => {
  const authLink = setContext (() => ({
    headers: {authorization: `Bearer ${token}`}
  })),
  client = new ApolloClient ({
    link: authLink.concat (createHttpLink ({uri, fetch})),
    cache: new InMemoryCache()
  })

  const parsed = parser (topics)
  await Promise.map (parsed.graph.nodes, createTopic (client), {concurrency: 1})
  console.log (`Successfully seeded nodes`)
  await Promise.map (parsed.graph.edges, createRelation (client), {concurrency: 1})
  console.log (`Successfully seeded relations`)
}
