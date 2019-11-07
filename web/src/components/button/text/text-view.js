import {H, React} from 'common'

const View = (props) => (
  <span {...props}>{props.children}</span>
)

export default H.styled (View) ``