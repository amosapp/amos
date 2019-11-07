import {H} from 'common'

const book = H.css`
  position: relative;
  top: 12px;
  left: 5px;
`,

otherwise = H.css`
  display: inline-block;
  vertical-align: middle;
`,

top = H.css`
  height: ${H.prop (`height`, `24px`)};
  ${(p) => p.book ? book : otherwise};
`

export default top
