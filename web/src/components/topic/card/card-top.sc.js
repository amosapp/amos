import {H, SplitButton, Icon} from 'common'

const top = H.css`
  width: 90%;
  max-width: 500px;
  /* Stretch to fill screen */
  @media (min-width: 550px) {
    width: 500px;
  }
  border-radius: 12px;
  border: 1.3px solid black;
  padding: 10px 15px;
  margin: 48px auto;
  word-break: break-word;
  hyphens: auto;

  > p {
    margin: 10px 0;
  }

  ${Icon} {
    margin-bottom: 10px;
  }

  ${SplitButton} {
    margin-top: -5px;
    margin-bottom: 5px;
  }
`

export default top