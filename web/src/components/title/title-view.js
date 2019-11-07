import {H, React} from 'common'
import top from './title-top.sc'

const View = ({children, ...rest}) => (
  <h1 css={top} {...rest}>
    {children}
  </h1>
)

export default H.styled (View) ``