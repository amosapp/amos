import {H, R, React} from 'common'
import Bubble from './bubble'
import top from './amos-chat-top.sc'
import Avatar from './avatar'
import ChatFlow from './chat-flow'
import CallToAction from './call-to-action'

const toText = child => typeof child === `function` ? child() : child,

toBubble = (child, key) => (
  <Bubble key={key}>{toText (child)}</Bubble>
),

View = ({avatar = `medium`, children, callToAction, ...rest}) => {
  if (typeof children !== `object`) {
    // children is either a string or a function, not an array
    children = R.of (children)
  }

  return (
    <div css={top} {...{avatar}} {...rest}>
      {avatar !== `none` && <Avatar size={avatar} timeout={2400}/>}
      <ChatFlow size={avatar}>
        <Bubble>{toText (children[0])}</Bubble>
        {children.slice(1).map (toBubble)}
        <CallToAction>{callToAction}</CallToAction>
      </ChatFlow>
    </div>
  )
}

export default H.styled (View) ``
