import typeDefs from './types'
import resolvers from './resolvers'
import {makeExecutableSchema} from 'apollo-server'

export default {
  typeDefs,
  resolvers,
  // TODO: Change
  allowUndefinedInResolve: true,
} |> makeExecutableSchema
