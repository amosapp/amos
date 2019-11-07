import {gql, useMutation} from 'common'

const

SIGNUP_GQL = gql`
  mutation Signup ($input: SignupInput!) {
    signup (input: $input) {
      success
      message
      login @client
    }
  }
`,

emailHook = () => {
  const signup = useMutation (SIGNUP_GQL)

  return {signup}
}

export default emailHook