import {H, R, React, CONST} from 'common'

/* eslint-disable max-len */
const makeOne = p => (
  <span>
    {CONST.elements.strength[p.strength]} to be at least <i>{CONST.elements.level[p.level]}</i> in {p.topic?.names?.[0] || p.topic}
  </span>
)

const makePs = R.cond ([
  [H.hasLength (1), ps => makeOne (ps[0])],
  [H.hasLength (2), ps => (
    <span>
      {makeOne (ps[0])} and {makeOne (ps[1])}
    </span>
  )],
  [R.T, ps => (
    <span>
      {H.safeMap (p => <span>{makeOne (p)}, </span>) (R.dropLast (2) (ps))} {makeOne (ps[R.length (ps) - 2])} and {makeOne (R.last (ps))}
    </span>
  )]
])

const View = (props) => {
  const {prerequisites} = props
  return <span {...props}>{makePs (prerequisites)}</span>
}

export default H.styled (View) ``