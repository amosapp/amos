import {
  H, CONST,
  AuthOptions, Button
} from 'common'

const

{avatar_large, avatar_medium} = CONST

const top = H.css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: ${avatar_medium / 2 - 21.7 + (avatar_large - avatar_medium) / 2}px;

  > a + ${Button} {
    margin-top: 20px;
  }

  > ${AuthOptions} {
    margin-top: 20px;
  }
`

export default top
