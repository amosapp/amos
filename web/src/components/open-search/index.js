/* eslint-disable */
/* not currently used 🏗 */
import {
  React, Redirect, useQueryParam, StringParam
} from 'common'

const OpenSearch = (props) => {
  const [query] = useQueryParam (`query`, StringParam),
  [] = [query |> console.log ('query', #)]
  
  return (
    <></>
  )
}

export default OpenSearch