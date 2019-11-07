import {H, React, R} from 'common'
import top from './nav-menu-top.sc'
import Link from './link'

const isActive = (_, {pathname: p}) => (
  R.either
  (R.equals (`/learn`))
  (R.startsWith (`/topic/`)) (p)
)

const isLogin = R.pathEq([`history`, `location`, `pathname`], `/login`)

const View = ({isAuthenticated, ...rest}) => (
  <div css={top} {...rest}>
    <Link to='/review'>
      Review
    </Link>
    <Link to='/learn' {...{isActive}}>
      Learn
    </Link>
    <Link to='/about'>
      About
    </Link>
    {/* <Link to='/notifications' hidden={true}>
      Notifications
    </Link> */}
    <Link to='/profile' hidden={!isAuthenticated}>
      Profile
    </Link>
    <Link to='/signup' hidden={isAuthenticated || isLogin (rest)}>
      Sign up
    </Link>
    <Link to='/login' hidden={isAuthenticated || !isLogin (rest)}>
      Log in
    </Link>
  </div>
)

export default H.styled (View) ``
