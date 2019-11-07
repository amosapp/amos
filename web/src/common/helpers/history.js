import {createBrowserHistory} from 'history'

export const

history = createBrowserHistory(),

navto = url => () => history.push(url),

redirect = ({location: {pathname: from}}) => ({
  pathname: `/review`,
  state: {from}
})
