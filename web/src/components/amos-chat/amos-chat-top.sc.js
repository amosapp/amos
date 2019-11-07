import {H} from 'common'
import ChatFlow from './chat-flow'

const notSmall = H.css`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const options = {
  medium: notSmall,
  large: notSmall
}

const top = H.css`
  align-items: flex-start;
  display: flex;
  ${H.options (options, `avatar`)}

  ${ChatFlow} {
    @media (max-width: 768px) {
      margin-left: 20px;
    }

    @media (min-width: 768px) {
      margin-left: 50px;
    }
  }
`

export default top
