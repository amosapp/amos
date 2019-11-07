import {Cookies} from 'common'

const logout = (_, args, {client}) => {
  (new Cookies()).remove (`auth`)
  client.resetStore()
}

export default logout