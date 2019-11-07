import * as R from 'ramda'
import fs from 'fs'
import path from 'path'

export const

ls = rec => dirBase => dir => regExp => R.map (R.pipe (
  f => `${dir}/${f}`,
  relPath => (
    /* eslint-disable no-sync */
    fs.lstatSync (path.join (dirBase, relPath)).isDirectory()
      ? ls (rec) (dirBase) (relPath) (regExp)
      : R.test (regExp) (relPath)
        ? relPath
        : null
  )
)) (fs.readdirSync (path.join (dirBase, dir)))
|> R.flatten
|> R.reject (R.isNil) (#),

requireContext = dirAbs => key => require (path.resolve (dirAbs, key)),

context = dirBase => dirRel => regExp => {
  const

  dirAbs = path.resolve (dirBase, dirRel),
  keys = ls (true) (dirAbs) (`.`) (regExp)

  const _requireContext = requireContext (dirAbs)
  _requireContext.keys = () => keys

  return _requireContext
},
defOpts = {def: true, other: true, parent: false},

_importContext = _opts => req => do {
  const opts = R.merge (defOpts) (_opts)
  R.reduce ((acc, key) => {
    const name = R.pipe (
      /* Get file name */
      R.split (`/`), R.last,
      /* Drop extension */
      R.split (`.`), R.head
    ) (key)
    const exports = req (key)
    const def =
      opts.def && R.has (`default`) (exports)
        ? {[name]: exports.default}
        : {}
    const other =
      opts.other
        ? R.omit ([`default`]) (exports)
        : {}
    const _res = R.mergeDeepRight (other) (def)
    const res =
      opts.parent
        ? do {
          const parent = R.pipe (R.split (`/`), R.nth (-2)) (key)
          const o = {[parent]: _res}
          o
        }
        : _res
    return R.mergeDeepRight (acc) (res)
  }) ({}) (req.keys())
},

importContext = _importContext (defOpts),

_req = opts => R.curryN (3) (R.pipe (R.uncurryN (3) (context), _importContext (opts))),

req = _req (defOpts),

reqResolvers = dirBase => (
  context (dirBase) (`.`) (/\.\/.+\/.+\/.+\.js$/)
    |> _importContext ({other: false, parent: true}) (#)
),

reqAll = dirBase => (
  context (dirBase) (`.`) (/\.\/(?!index).+\.js/)
    |> importContext
)