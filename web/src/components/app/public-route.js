import {
  React, Redirect, Route, H, W,
} from 'common'

const PublicRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <Redirect to={H.redirect (props)}/> : <C {...props}/>
  )}/>
)

export default W.GET_AUTH (PublicRoute)
