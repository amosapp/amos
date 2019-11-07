import {
  R, React, W, styled,
  Button
} from 'common'
import AuthOptions from './auth-options'
import top from './auth-box-top.sc'

const fbLogin = (authFacebook) => ({status, authResponse: {accessToken: fbAccessToken}}) => (
  R.equals (status, `connected`) && do {
    authFacebook ({variables: {input: {fbAccessToken}}})
  }
),

onClick = (authFacebook) => () => {
  /* eslint-disable no-undef */
  FB.login (fbLogin (authFacebook), {scope: [`public_profile`, `email`]})
},

github = `https://github.com/login/oauth/authorize?client_id=72be28a7ee64c7cd1948&scope=user:email`,

View = ({authFacebook, ...rest}) => (
  <div css={top} {...rest}>
    <a href={github}>
      <Button
        icon='github'
        width={`250px`}
      >
        Continue with Github
      </Button>
    </a>
    <Button
      icon='facebook'
      width={`250px`}
      onClick={onClick (authFacebook)}
    >
      Continue with Facebook
    </Button>
    <AuthOptions/>
  </div>
)

export default View
  |> W.authFacebook
  |> styled (#) ``
