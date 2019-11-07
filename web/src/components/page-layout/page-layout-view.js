import {
  H, React,
  NavMenu,
} from 'common'
import content from './content.sc'
import top from './page-layout-top.sc'

const View = ({isAuthenticated, children, ...rest}) => (
  <div css={top} {...rest}>
    <NavMenu {...{isAuthenticated}}/>
    <div css={content} {...rest}>{children}</div>
  </div>
)

export default H.styled (View) ``
