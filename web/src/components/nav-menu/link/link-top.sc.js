import {H} from 'common'

const link = H.css`
  color: black;
  display: ${H.ifProp (`hidden`, `none`, `inline`)};
  font-size: 20px;
  font-weight: 500;
  padding: 0px 10px;
  text-decoration: none;
  text-transform: uppercase;

  &.active {
    color: #0066ff
  }
  & + & {
    margin-left: 16px;
  }

  &:hover {
    color: #2F82FF;
  }
`

export default link
