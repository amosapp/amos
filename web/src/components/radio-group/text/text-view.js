import {H, React} from 'common'
import top from './text-top.sc'

const View = (props) => (
  <div css={top} {...props}>{props.children}</div>
)

export default H.styled (View) ``