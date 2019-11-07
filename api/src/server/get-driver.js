import {v1 as neo4j} from 'neo4j-driver'

export default () => do {
  const uri = process.env.NEO4J_URI || process.env.GRAPHENEDB_BOLT_URL,
  username = process.env.NEO4J_USERNAME || process.env.GRAPHENEDB_BOLT_USER,
  password = process.env.NEO4J_PASSWORD || process.env.GRAPHENEDB_BOLT_PASSWORD

  neo4j.driver (uri, neo4j.auth.basic (username, password))
}