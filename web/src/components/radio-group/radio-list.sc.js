import {H} from 'common'

const radioList = H.css`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;

  > * {
    display: flex;
    align-items: center;
    margin: 0.5rem;
  }

  input {
    appearance: none;

    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;

    border: 2px solid #999;
    transition: 0.05s border linear;
    outline: none;
    margin-right: 0.5em;
  }

  input:checked {
    border: 6px solid #0066FF;
  }
`

export default radioList