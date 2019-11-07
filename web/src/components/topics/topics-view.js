import {H, R, React} from 'common'

const makeTopics = R.cond ([
  [H.hasLength (1), R.identity],
  [H.hasLength (2), topics => (
    <span>
      {topics[0]} and {topics[1]}
    </span>
  )],
  [R.T, topics => (
    /* eslint-disable max-len */
    <span>
      {H.safeMap (t => <span>{t}, </span>) (R.dropLast (2) (topics))} {R.nth (R.length (topics) - 2) (topics)} and {R.last (topics)}
    </span>
  )]
])

const View = (props) => (
  <span {...props}>{makeTopics (props.topics)}</span>
)

export default H.styled (View) ``