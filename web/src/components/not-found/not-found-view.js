import {H, React} from 'common'
import top from './not-found-top.sc'

const View = ({...rest}) => (
  <div css={top} {...rest}>
    Page not found
  </div>
)

export default H.styled (View) ``
