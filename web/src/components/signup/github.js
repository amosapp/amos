import {
  H, React, hooks, W, CONST, validation,
  AmosChat, Button, Input
} from 'common'
import top from './signup-top.sc'

const message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.signup
)

const Github = (props) => {
  const
  {
    onSubmit, messages, form: {register}, errors, ...rest
  } = hooks.form ({validationSchema: validation.usernameOnly}) ({message}) (props)
  return <form css={top} onSubmit={onSubmit} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      errors={errors}
      name='username'
      label='Username'
      ref={register}
    />
    <Button primary width='150px' type='submit'>
      Sign up
    </Button>
  </form>
}

export default H.styled (W.github (Github)) ``
