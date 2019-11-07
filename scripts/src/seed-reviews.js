import {
  R, H, ApolloClient, gql, fetch, setContext, createHttpLink, InMemoryCache, Promise, reviews
} from './common'

const

{hackprague, others, goodreads} = reviews,

[uri] = R.props
([`API_URL`])
(process.env),

mutation = gql`
  mutation AddReview($input: AddReviewHydrationInput!) {
    addReviewHydration(input: $input) {
      success
    }
  }
`,

createReview = (client) => async (rev) => {
  // JSON.stringify (rev) |> console.log ('JSON.stringify (rev)', #)
  await client.mutate ({mutation, variables: {input: rev}})
},

createHackPragueReview = (client) => async (rev) => {
  // JSON.stringify (rev) |> console.log ('JSON.stringify (rev)', #)
  const _rev = R.omit ([`prerequisites`]) (H.renameKeys ({urls: `url_main`}) (rev))
  await client.mutate ({mutation, variables: {input: _rev}})
}

export default async (token) => {
  const authLink = setContext (() => ({
    headers: {authorization: `Bearer ${token}`}
  })),
  client = new ApolloClient ({
    link: authLink.concat (createHttpLink ({uri, fetch})),
    cache: new InMemoryCache()
  })

  // console.log (`Creating HackPrague reviews`)
  // // await Promise.mapSeries (R.slice (0) (100) (hackprague), createHackPragueReview (client))
  // await Promise.mapSeries (hackprague, createHackPragueReview (client))
  // console.log (`Successfully created HackPrague reviews`)

  // console.log (`Creating Other reviews`)
  // // await Promise.mapSeries (R.slice (0) (100) (others), createReview (client))
  // await Promise.mapSeries (others, createReview (client))
  // console.log (`Successfully created Other reviews`)

  console.log (`Creating Goodreads reviews`)
  await Promise.mapSeries (R.slice (0) (7198) (goodreads), createReview (client))
  // await Promise.mapSeries (goodreads, createReview (client))
  console.log (`Successfully created Goodreads reviews`)

  // console.log (R.length (hackprague))
  // console.log (R.length (others))
  // console.log (R.length (goodreads))
}
