import {H} from 'common'

const content = H.css`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
  padding-bottom: 65px;

  @media (min-width: 768px) {
    margin-top: 10vh;
  }
`

export default content
