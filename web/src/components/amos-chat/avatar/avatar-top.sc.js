import {H, CONST} from 'common'

const

{avatar_medium, avatar_large, avatar_small} = CONST,

none = H.css`
  height: 0;
  width: 0;
`,

small = H.css`
  min-height: ${avatar_small}px;
  width: ${avatar_small}px;
  margin-top: ${(avatar_large - avatar_small) / 2}px;
`,

medium = H.css`
  min-height: ${avatar_medium}px;
  width: ${avatar_medium}px;
  margin-top: ${(avatar_large - avatar_medium) / 2}px;
`,

large = H.css`
  min-height: ${avatar_large}px;
  width: ${avatar_large}px;
`,

options = {none, small, medium, large},

top = H.css`
  display: inline;
  ${H.options (options, `size`)}};
`

export default top
