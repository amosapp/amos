import {
  H,
  AuthOptions, Button, Input
} from 'common'

const top = H.css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  width: 100%;

  ${Input} {
    margin-top: 24px;
  }

  ${Button} {
    margin-top: 24px;
  }

  ${AuthOptions} {
    margin-top: 20px;
  }
`

export default top
