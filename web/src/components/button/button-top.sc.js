/* eslint-disable max-lines */
import {H, Icon} from 'common'
import Text from './text'

const primary = H.css`
  background-color: #0066FF;
  border: 1px solid #0066FF;
  color: white;
  white-space: nowrap;

  &:hover {
    background-color: #2F82FF;
  }
`,

iconOnly = H.css`
  font-size: 0;
  padding: 0;
  width: 40px;

  > svg {
    height: 17px;
  }
`,

top = H.css`
  background-color: white;
  border-radius: 8px;
  border: 1.3px solid #959595;
  color: black;
  cursor: pointer;
  font-size: 15px;
  min-height: ${H.prop (`height`, `40px`)};
  padding: 0 20px;
  user-select: none;
  width: ${H.prop (`width`, `auto`)};

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
    
    &:hover {
      background-color:grey;
    }
  }

  ${H.ifProp (`primary`, primary)}
  ${H.ifProp (`iconOnly`, iconOnly)}

  > ${Icon} {
    height: 15px;
  }

  > ${Text} {
    vertical-align: middle;
  }

  > ${Icon} + ${Text} {
    margin-left: 8px;
  }

  &:active {
    transform: scale(0.98);
  }
  &:hover {
    background-color: #fafafc;
  }
  &:focus {
    outline: none;
  }
`

export default top