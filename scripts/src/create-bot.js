import {
  R, ApolloClient, gql, createHttpLink, InMemoryCache, fetch
} from './common'

const

[uri] = R.props
([`API_URL`])
(process.env),

client = new ApolloClient ({
  link: createHttpLink ({uri, fetch}),
  cache: new InMemoryCache()
}),

mutation = gql`
  mutation Signup ($input: SignupInput!) {
    signup (input: $input) {
      success
      message
    }
  }
`

export default async () => {
  const password = process.env.AMOS_PASSWORD,
  input = {
    username: `amos`,
    email: `amos@solvio.org`,
    password,
    repeatPassword: password
  }
  const {data: {signup: {success, message}}} = await client.mutate ({mutation, variables: {input}})
  !success && throw new Error (`Couldn't create Amos ${message}`)
  return message
}
