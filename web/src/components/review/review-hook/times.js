import {R, React} from 'common'

const times = (props) => {
  const

  /* eslint-disable no-shadow */
  [times, setTimes] = React.useState (1),
  {valid, checkboxesValid, review, name} = props,

  /* Set times on hydration */
  [] = [review?.[name]
    && (R.length (review[name]) > times)
    && (R.length (review[name]) |> setTimes)],

  /* Find last valid index */
  lastIndex = name === `prerequisite`
    ? do {
      const valids = R.zip (valid, checkboxesValid)
      R.findLastIndex (R.reduce ((acc, val) => acc && val) (true)) (valids)
    }
    : R.findLastIndex (R.identity) (valid),

  /* times should always be lastIndex + 2 */
  [] = [lastIndex + 2 > times && setTimes (lastIndex + 2)]
  return R.merge ({times}) (props)
}

export default times