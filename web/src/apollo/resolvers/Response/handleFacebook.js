import {H} from 'common'
import login from './login'

const handleFacebook = async ({success, message}, _, {cache}) => {
  return success && do {
    message[0] === `token`
      ? do {
        await login ({success, message: message[1]}, _, {cache})
      }
      : do {
        cache.writeData ({data: {fbAccessToken: message[1]}})
        H.navto (`/signup/facebook`) ()
      }
  }
}

export default handleFacebook