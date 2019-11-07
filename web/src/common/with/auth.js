import {React, useQuery, gql} from 'common'

export const

GET_AUTH_GQL = gql`
  {
    isAuthenticated @client
  }
`,

GET_AUTH = C => ({...rest}) => {
  const {data} = useQuery (GET_AUTH_GQL)
  return (
    <C {...data} {...rest}/>
  )
}