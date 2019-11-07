import 'regenerator-runtime/runtime'
import server from './server/server'

const app = server(),
PORT = process.env.GRAPHQL_PORT || process.env.PORT

app.listen (PORT, () => {
  /* eslint-disable no-console */
  console.log (`GraphQL Server ready at ${PORT} 🚀`)
})
