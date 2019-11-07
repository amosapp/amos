import {
  H,
  Input, Title
} from 'common'

const inputForm = H.css`
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  ${Input} {
    margin-top: 18px;
  }

  ${Title} {
    margin-top: 18px;
  }

  form {
    display: flex;
    justify-content: center;
  }
`

export default inputForm