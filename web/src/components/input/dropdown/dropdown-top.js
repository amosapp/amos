import {H} from 'common'

const top = H.css`
  label {
    display: block;
    overflow: hidden;
    z-index: 2;
    width: 350px;
    background-color: white;
    border-radius: 12px;
    border: 1.3px solid black;
    margin-top: 10px;
    /*  transition: all 1s ease-out;*/
  }

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 1.2em 0.45em;
    background: white;
    /* border-top: 1px solid rgba(0, 0, 0, 0.3); */
    cursor: pointer;
    z-index: 2;
  }
  
  .active {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: inherit !important;
  }

  /* .show {display: block;} */
`

export default top