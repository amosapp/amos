import {
  H, React,
  AmosChat, Button
} from 'common'
import top from './signup-top.sc'

const messages = [
  `Nice to meet you too 😴`,
  () => <span>Now - let's get to work! 🖌 📚<br/>Go ahead and ...</span>,
]

const Success = ({...rest}) => (
  <div css={top} {...rest}>
    <AmosChat>{messages}</AmosChat>
    <Button primary onClick={H.navto (`/review`)}>
      Submit a Review
    </Button>
  </div>
)

export default H.styled (Success) ``
