import {
  H, React,
  AmosChat, AuthBox
} from 'common'
import top from './signup-top.sc'

const Guest = ({...rest}) => (
  <div css={top} {...rest}>
    <AmosChat>
      Once you sign up, you'll be able to get attribution for your Reviews. And it's free!
    </AmosChat>
    <AuthBox/>
  </div>
)

export default H.styled (Guest) ``
