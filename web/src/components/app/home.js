import {
  React, Redirect, W
} from 'common'

const View = ({isAuthenticated}) => (
  <>
    {isAuthenticated
      ? <Redirect to='/learn'/>
      : <Redirect to='/about'/>
    }
  </>
)

export default W.GET_AUTH (View)
