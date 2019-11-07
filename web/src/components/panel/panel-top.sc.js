import {H, Title} from 'common'

const one = H.css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  width: 100%;
`

const two = H.css`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12.5vw;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const left = H.css`  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const options = {one, two, left}

const top = H.css`
  ${H.options (options, `columns`, `one`)}

  > ${Title} {
    margin-bottom: 24px
  }
`

export default top
