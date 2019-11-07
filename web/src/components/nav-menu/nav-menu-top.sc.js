import {H} from 'common'
import Link from './link'

const top = H.css`
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    order: 100;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 100;
    width: 100%;
    padding-left: 0;

    ${Link} {
      font-size: 16px;
    }
  }
`

export default top
