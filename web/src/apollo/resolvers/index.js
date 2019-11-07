import {H} from 'common'

const

query = require.context (`.`, true, /\.\/Query\/.+\.js$/),
mutation = require.context (`.`, true, /\.\/Mutation\/.+\.js$/),
response = require.context (`.`, true, /\.\/Response\/.+\.js$/)

export default {
  Query: query |> H.importContext,
  Mutation: mutation |> H.importContext,
  Response: response |> H.importContext,
}
