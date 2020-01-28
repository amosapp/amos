import {
  H, R, React, W,
  Input, AmosChat
} from 'common'
import top from './learn-top.sc'

let messages = [
  `Watcha interested in? 🤗`,
  `Update: The database is currently on a dev plan. So after typing something, you need to wait 30 s for it to wake up.`,
  `Then all requests should work, including read and post. 😔`
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
      onEnt={onEnt}
      results={results}
      ref={register}
      link
      {...rest}
    />
  </form>
)

export default H.styled (W.search (View)) ``
