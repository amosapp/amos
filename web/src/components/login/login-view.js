import {
  H, React, hooks, CONST, validation,
  AmosChat, Input, Button, AuthOptions
} from 'common'
import hook from './login-hook'
import top from './login-top.sc'

const message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.login
)

const boxShadowWidth = `0`

const View = (props) => {
  const {login} = hook (props)
  const {
    onSubmit, messages, form: {register, errors}
  } = hooks.form
  /* eslint-disable indent */
    ({
      validationSchema: validation.login,
      submitFocusError: false,
      mode: `onBlur`,
    })
    ({message})
    ({...props, onSubmit: login})
  return <form css={top} onSubmit={onSubmit} {...props}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      label='Username or email'
      name='usernameOrEmail'
      ref={register}
      {...{errors, boxShadowWidth}}
    />
    <Input
      label='Password'
      name='password'
      type='password'
      dontFocus={true}
      {...{errors, boxShadowWidth}}
      ref={register}
    />
    {/* <Link to='/forgot-password'>Forgot password</Link> */}
    <Button primary type='submit'>
      Log in
    </Button>
    <AuthOptions
      first={{
        link: `/signup`,
        text: `Use social`
      }}
      second={{
        link: `/signup/email`,
        text: `Sign up`
      }}
    />
  </form>
}

export default H.styled (View) ``