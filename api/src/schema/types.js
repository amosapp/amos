import {H, R} from 'common'
import {mergeTypes} from 'merge-graphql-schemas'

const cache = H.context (__dirname) (`.`) (/\.gql$/)
const all = R.map (H.read (__dirname)) (cache.keys())

export default mergeTypes (all)
