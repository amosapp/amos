import {H, React} from 'common'
import top from './label-top.sc'

const View = props => (
  <span css={top} {...props}>{props.children}</span>
)

export default H.styled (View) ``