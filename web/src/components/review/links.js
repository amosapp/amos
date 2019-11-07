import {
  H, React,
  AmosChat, Button, Title, Input
} from 'common'
import {useReviewLinks} from './review-hook'
import top from './review-top.sc'
import Buttons from './buttons'
import inputForm from './input-form.sc'

const Links = (props) => {
  const {
    onSubmit, messages, form, errors, valid, onChange, onEnt, ...rest
  } = useReviewLinks (`link`) (props)

  return <div css={top} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <div css={inputForm}>
      <Title>Links</Title>
      <Buttons>
        <form onSubmit={onSubmit.next}>
          <Button primary type='submit'>
            Next
          </Button>
        </form>
      </Buttons>
      <Input
        name='link[0]'
        errors={form.errors[name]}
        onEnt={onEnt}
        ref={form.register}
        noDropdown={true}
        errors={errors}
        valid={valid}
        onChange={onChange}
      />
    </div>
  </div>
}

export default H.styled (Links) ``
