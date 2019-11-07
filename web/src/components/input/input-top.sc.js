import {H} from 'common'
import Label from './label'

const top = H.css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  > ${Label} {
    margin: 0 0 7.5px 11px;
  }
`

export default top
