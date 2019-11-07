import * as R from 'ramda'

export const

renameKeys = keysMap => obj => (
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
)