import {
  React, Redirect, Route, H, W
} from 'common'

const PrivateRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <C {...props}/> : <Redirect to={H.redirect (props)}/>
  )}/>
)

export default W.GET_AUTH (PrivateRoute)
