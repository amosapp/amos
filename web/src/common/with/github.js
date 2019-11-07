import {
  H, React, gql, useMutation, useQueryParam, StringParam,
} from 'common'

export const

AUTH_GITHUB_GQL = gql`
  mutation AuthGithub ($input: AuthGithubInput!) {
    authGithub (input: $input) {
      success
      message
      handleGithub @client
    }
  }
`,

SIGNUP_GITHUB_GQL = gql`
  mutation SignupGithub ($input: SignupGithubInput!) {
    signupGithub (input: $input) {
      success
      message
      login @client
    }
  }
`,

github = C => ({match, ...rest}) => {
  const

  [ghCode] = useQueryParam (`code`, StringParam),

  [exec, {data}] = useMutation (AUTH_GITHUB_GQL, {variables: {input: {ghCode}}}),
  ghAccessToken = data?.authGithub?.handleGithub,
  skip = H.isNilOrEmpty (ghAccessToken),
  input = {ghAccessToken},

  signupGithub = useMutation (SIGNUP_GITHUB_GQL, {skip})

  H.useMount(() => {
    exec()
  })

  return (
    <C onSubmit={signupGithub} {...{input}} {...rest}/>
  )
}