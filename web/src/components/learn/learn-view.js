import {
  H, R, React, W,
  Input, AmosChat
} from 'common'
import top from './learn-top.sc'

let messages = [
  `Watcha interested in? 🤗`,
  `UPDATE: You need to select a topic from the list. If there's no list, try going back a few characters and you should see one!`
]

if (/Mobi/.test(navigator.userAgent)) {
  messages = R.append (`...On mobile you may need to close the keyboard for the topics to work!`) (messages)
}

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
