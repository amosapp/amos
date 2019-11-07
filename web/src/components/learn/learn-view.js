import {
  H, React, W,
  Input, AmosChat
} from 'common'
import top from './learn-top.sc'

const messages = [
  `Watcha interested in? 🤗`
]

const View = ({onEnt, results, register, onSubmit, ...rest}) => (
  <form css={top} autocomplete='off' onSubmit={onSubmit} {...rest}>
    <AmosChat avatar='small'>
      {messages}
    </AmosChat>
    <Input
      name='str'
      link={true}
      onEnt={onEnt}
      results={results}
      ref={register}
      {...rest}
    />
  </form>
)

export default H.styled (W.search (View)) ``
