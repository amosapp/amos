// import {coreJs, regenerator} from './common'
import cleanDb from './clean-db'
import createBot from './create-bot'
import seedTopics from './seed-topics'
import seedReviews from './seed-reviews'

/* from https://stackoverflow.com/a/38446960/4204961 */

global.Buffer = global.Buffer || require(`buffer`).Buffer

if (typeof btoa === `undefined`) {
  global.btoa = function (str) {
    return new Buffer(str, `binary`).toString(`base64`)
  }
}

if (typeof atob === `undefined`) {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, `base64`).toString(`binary`)
  }
}

/* from https://stackoverflow.com/a/51466112/4204961 */
global.fetch = require(`node-fetch`)

const run = async () => {
  try {
    // console.log (`cleaning db`)
    // await cleanDb()
    // console.log (`creating amos profile`)
    // const amosJwt = await createBot()
    // console.log(`amosJwt`, amosJwt)
    // console.log (`seeding topics`)
    // await seedTopics (amosJwt || process.env.AMOS_JWT)
    console.log (`seeding reviews`)
    // await seedReviews (amosJwt || process.env.AMOS_JWT)
    await seedReviews (process.env.AMOS_JWT)
  }
  catch (e) {
    console.log (`Something went wrong`, e.message)
  }
}

run()