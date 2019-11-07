import opts from './opts'
import {ApolloServer} from 'apollo-server-express'
import express from 'express'

const server = () => do {
  /* eslint-disable no-shadow */
  const server = new ApolloServer (opts),
  app = express()
  server.applyMiddleware ({app, path: `/`})
  app
}

export default server
