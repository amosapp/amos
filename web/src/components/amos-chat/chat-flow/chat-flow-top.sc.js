import {H, CONST} from 'common'
import Bubble from '../bubble'
import CallToAction from '../call-to-action'

const

{avatar_medium, avatar_large, avatar_small} = CONST,

none = H.css`
  margin-top: 0;
`,

small = H.css`
  margin-top: ${avatar_small / 2 - 21.7 + (avatar_large - avatar_small) / 2}px;
`,

medium = H.css`
  /* 21.7 is half of height of first line of bubble */
  margin-top: ${avatar_medium / 2 - 21.7 + (avatar_large - avatar_medium) / 2}px;
`,

large = H.css`
  margin-top: ${avatar_large / 2 - 21.7}px
`,

options = {none, small, medium, large},

top = H.css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: stretch;
  }

  ${H.options (options, `size`)};

  ${CallToAction} {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  ${Bubble} + ${Bubble} {
    margin-top: 16px;
  }
`

export default top