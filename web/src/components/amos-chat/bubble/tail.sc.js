import {H} from 'common'

const tail = H.css`
  position: absolute;
  overflow: hidden;
  top: 12px;
  left: -10px;
  height: 12px;
  width: 10px;

  &::after {
    background: #ffffff;
    border: 1.3px solid black;
    content: '';
    height: 100%;
    position: absolute;
    right: -6px;
    top: -9px;
    transform-origin: 0 100%;
    transform: rotate(47deg);
    width: 100%;
  }
`

export default tail
