import {
  R, React, Switch, Route, Redirect, W
} from 'common'
import Guest from './guest'
import Links from './links'
import Topics from './topics'
import Prerequisites from './prerequisites'
import Confirm from './confirm'
import Thanks from './thanks'

const redirect = R.both (
  R.propEq (`isAuthenticated`, true),
  R.pathEq ([`location`, `pathname`], `/review`)
)

const Routes = (props) => {
  return redirect (props)
    ? <Redirect to='/review/links'/>
    : (
      <Switch>
        <Route path='/review' exact component={Guest} />
        <Route path='/review/links' component={Links} />
        <Route path='/review/topics' component={Topics} />
        <Route path='/review/prerequisites' component={Prerequisites} />
        <Route path='/review/confirm' component={Confirm} />
        <Route path='/review/thanks' component={Thanks} />
      </Switch>
    )
}

export default W.GET_AUTH (Routes)
