import {H, React} from 'common'

const View = (props) => (
  <div {...props}>{props.children}</div>
)

export default H.styled (View) ``