/* eslint-disable max-lines */
import * as R from 'ramda'

export const

/**
 * @description Universal lens
 * @param path
 * @param obj
 */
lens = R.cond ([
  [R.is (String), R.lensProp],
  [R.is (Number), R.lensIndex],
  [R.T, R.lensPath]
]),

set = R.curry ((path, val, obj) => R.set (lens (path, obj), val, obj)),

over = R.curry ((path, cb, obj) => R.over (lens (path, obj), cb, obj)),

/**
 * @description Tests whether function is not `null` or `undefined`
 * @param val
 */

neq = R.complement (R.equals),

isNotNil = R.complement (R.isNil),
isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (R.isNil) (R.isEmpty),
isNotNilOrEmpty = R.both (isNotNil, isNotEmpty),


/**
 * @description Like R.map but you get (val, key)!
 * @param cb
 * @param obj
 */
map = R.addIndex (R.map),

/**
 * @description Apply two functions and return result of the second
 * @param Arb Arbitrary number of params
 */

intercept = cb => fn => R.converge (R.nthArg (0)) ([fn, cb]),

/**
 * @description Wrap any function with debug to log its arguments
 * @param Arb Arbitrary number of params
 */
debug = intercept (console.log),
safeMap = fn => obj => (
  R.isNil (obj)
    ? null
    : map (fn) (obj)
),

importContext = req => (
  R.reduce ((acc, key) => {
    const name = R.pipe (
      /* Get file name */
      R.split (`/`), R.last,
      /* Drop extension */
      R.split (`.`), R.head
    ) (key)
    const _exports = req (key)
    const exportsMerged = R.merge (R.omit ([`default`]) (_exports)) (acc)
    const defaultExport = R.has (`default`) (_exports)
      ? {[name]: _exports.default}
      : {}
    return R.merge (defaultExport) (exportsMerged)
  }) ({}) (req.keys())
),

reduce = R.addIndex (R.reduce),

atleast = min => val => val < min ? min : val,

/**
 * @description Ramda's `update` doesn't work if the index doesn't exist
 */
update = R.curry((idx, val, arr) => {
  const _arr = [...arr]
  _arr[idx] = val
  return _arr
}),

hasLength = length => R.pipe (R.length, R.equals (length)),

getMessages = def => R.pipe (
  R.values,
  R.pluck (`message`),
  R.flatten,
  R.when (
    R.isEmpty,
    R.append (def),
  )
)
