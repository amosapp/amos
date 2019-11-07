import login from './login'

const handleGithub = async ({success, message: [type, message]}, _, {cache}) => (
  success && do {
    type === `token`
      ? do {
        await login ({success, message}, _, {cache})
      }
      : message
  }
)

export default handleGithub