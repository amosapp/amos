import {Cookies} from 'common'

const login = async ({success, message}, _, {cache}) => {
  if (success) {
    (new Cookies()).set (`auth`, message)
    cache.writeData ({data: {isAuthenticated: true}})
  }
  else {
    return {success, message}
  }
}

export default login