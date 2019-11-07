import {neo4j, R, fetch} from './common'

global.Headers = fetch.Headers

const [uri, username, password] = (
  R.props (
    [`NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`]
  ) (
    process.env
  )
)

uri |> console.log (`uri:`, #)

const detachDelete = `match (a) detach delete a`
const driver = neo4j.driver (uri, neo4j.auth.basic (username, password))
const ses = driver.session()

export default async () => {
  try {
    await ses.run (detachDelete)
    /* Can't log anything because query from amos-parser doesn't return anything */
    driver.close()
    console.log (`Successfully ran ${detachDelete}`)
  }
  catch (e) {
    throw new Error (`ERROR: ${e}`)
  }
}