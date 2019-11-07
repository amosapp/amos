import {H, React, R, gql, useQuery, useMutation} from 'common'

export const

AUTH_FACEBOOK_GQL = gql`
  mutation AuthFacebook ($input: AuthFacebookInput!) {
    authFacebook (input: $input) {
      success
      message
      handleFacebook @client
    }
  }
`,

GET_FB_ACCESS_TOKEN = gql`
  {
    fbAccessToken @client
  }
`,

SIGNUP_FACEBOOK_GQL = gql`
  mutation SignupFacebook ($input: SignupFacebookInput!) {
    signupFacebook (input: $input) {
      success
      message
      login @client
    }
  }
`,

signupFacebook = C => ({...rest}) => {
  const

  {data} = useQuery (GET_FB_ACCESS_TOKEN),
  fbAccessToken = data?.fbAccessToken,
  skip = H.isNilOrEmpty (fbAccessToken),
  input = {fbAccessToken},
  /* eslint-disable no-shadow */
  signupFacebook = useMutation (SIGNUP_FACEBOOK_GQL, {skip})

  return (
    <C onSubmit={signupFacebook} {...{input}} {...rest}/>
  )
},

authFacebook = C => (props) => {
  const

  [authFacebook] = useMutation (AUTH_FACEBOOK_GQL),

  forwardProps = R.merge ({authFacebook}) (props)

  return <C {...forwardProps} />
}