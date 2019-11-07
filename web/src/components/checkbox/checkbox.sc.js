import {H, R} from 'common'

const checkbox = H.css`
  display: flex;
  align-items: center;
  padding: .5rem;

  input {
    position: relative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none; // TODO: manage :focus
    background: white;
    cursor: pointer;
    width: ${p => (2 * p.size) - (2 * p.border)}px;
    height: ${R.prop (`size`)}px;
    border: ${R.prop (`border`)}px solid #959595;
    border-radius: ${p => p.size - (2 * p.border)}px;

    &::before {
      content: ' ';
      position: absolute;
      top: 50%;
      right: 50%;
      bottom: 50%;
      left: 50%;
      transition: all .1s;
      background: #0066FF;
      top: ${R.prop (`border`)}px;
      right: ${p => p.size - p.border}px;
      bottom: ${R.prop (`border`)}px;
      left: ${R.prop (`border`)}px;
      border-radius: 50%;
      background: #959595;
    }

    &:checked {
      border-color: #0066FF;

      &::before {
        right: ${R.prop (`border`)}px;
        left: ${p => p.size - p.border}px;
        background: #0066FF;
      }
    }
  }
`

export default checkbox
