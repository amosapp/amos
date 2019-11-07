import {H, React, NavLink} from 'common'
import top from './link-top.sc'

const View = (props) => (
  <NavLink css={top} {...props}>{props.children}</NavLink>
)

export default H.styled (View) ``