import * as R from 'ramda'
import fs from 'fs'
import path from 'path'

export const

/* eslint-disable no-sync */
read = dir => file => fs.readFileSync (path.join (dir, file), {encoding: `utf8`}),

mergeDeepAll = R.reduce (R.mergeDeepRight) ({}),

/**
 * @description
 * @example
 */
assert = pr => st => {
  pr
    ? null
    : throw new Error (st)
},

neq = R.complement (R.equals),

isNotNil = R.complement (R.isNil),
isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (R.isNil) (R.isEmpty),
isNotNilOrEmpty = R.both (isNotNil, isNotEmpty),

/**
 * @description Turns an array of named functions to object with keys corresponding to those names
 * @param {Array} - array of fns
 */
arrayOfFnsToObject = R.reduce ((acc, val) => R.set (R.lensProp (val.name)) (val) (acc)) ({}),

// mergeDeepWithKeyAll =

id = R.identity,

log = p => {
  /* eslint-disable no-console */
  console.log(`p`, p); return p
},

wrapInResponse = fn => {
  const _fn = async (...args) => {
    try {
      const _result = await fn (...args),
      /* If message is undefined set it to null (otherwise GraphQL complains) */
      result = R.over (R.lensProp (`message`)) (m => m || null) (_result)
      return R.merge (result) ({success: true})
    // } catch (e) {
    }
    catch ({message: _message, errors: message = [_message]}) {
      return {success: false, message}
    }
  }
  /* Name function */
  Object.defineProperty (_fn, `name`, R.objOf (`value`) (fn.name))
  return _fn
},

lens = R.cond ([
  [R.is (String), R.lensProp],
  [R.is (Number), R.lensIndex],
  [R.T, R.lensPath]
]),

set = R.curry ((_path, val, obj) => R.set (lens (_path, obj), val, obj)),

over = R.curry ((_path, cb, obj) => R.over (lens (_path, obj), cb, obj))