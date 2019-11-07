import {React, Switch, Route} from 'common'
import Email from './email'
import Facebook from './facebook'
import Github from './github'
import Success from './success'
import Guest from './guest'

const Routes = () => (
  <Switch>
    <Route path='/signup' exact component={Guest}/>
    <Route path='/signup/facebook' component={Facebook}/>
    <Route path='/signup/github' component={Github}/>
    <Route path='/signup/email' component={Email}/>
    <Route path='/signup/success' component={Success}/>
  </Switch>
)

export default Routes
