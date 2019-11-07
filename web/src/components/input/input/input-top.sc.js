import {H} from 'common'

const top = H.css`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${H.ifProp (`hasError`, `#ff7aa8`, `#dbdbdb`)};
  box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
  box-sizing: border-box;
  color: #363636;
  font-size: 1em;
  height: 3em;
  padding: 4px 10px;
  width: ${H.prop (`width`, `350px`)};

  &:active,
  &:focus {
    /* border-color: rgb(91, 183, 255); */
    border-color: #3273dc;
    box-shadow: 0 0 0 ${props => props.boxShadowWidth || `0.3em`} rgb(217, 238, 255);
    outline: none;
  }
`

export default top