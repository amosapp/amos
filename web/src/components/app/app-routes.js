import {
  H, R, React, Route, Switch, useEffect,
  NotFound, About, Login, Profile, Review, Learn, Signup, OpenSearch, Topic
} from 'common'
import Home from './home'
import PublicRoute from './public-route'
import PrivateRoute from './private-route'

const onKeyPress = (e) => {
  const {key} = e
  H.neq (`input`) (document.activeElement.localName) && do {
    e.preventDefault()
    const target = R.cond ([
      [R.equals (`r`), R.always (`/review`)],
      [R.equals (`l`), R.always (`/learn`)],
      [R.equals (`s`), R.always (`/learn`)],
      [R.equals (`a`), R.always (`/about`)],
      [R.equals (`p`), R.always (`/profile`)],
      [R.equals (`i`), R.always (`/login`)],
      [R.equals (`u`), R.always (`/signup`)],
      [R.equals (`e`), R.always (`/signup/email`)],
    ]) (key)
    target && H.navto (target) ()
  }
}

const Routes = () => {

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  return <Switch>
    <Route path='/' exact component={Home}/>
    <Route path='/about' component={About}/>
    <Route path='/learn' exact component={Learn}/>
    <Route path='/review' component={Review}/>
    <Route path='/topic/:name' component={Topic}/>
    <Route path='/opensearch' component={OpenSearch}/>
    <PublicRoute path='/login' component={Login}/>
    <PublicRoute path='/signup' component={Signup}/>
    {/* <Route path='/forgot-password' component={NotFound}/> */}
    <PrivateRoute path='/profile' component={Profile}/>
    <Route component={NotFound}/>
  </Switch>
}

export default (Routes)
