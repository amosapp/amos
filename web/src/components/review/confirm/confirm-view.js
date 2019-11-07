import {
  H, React, W,
  AuthBox
} from 'common'
import hook from './confirm-hook'
import top from '../review-top.sc'

const View = (props) => {
  const {amosChat} = hook (props)

  return props.isAuthenticated
    ? (
      <div css={top} {...props}>
        {amosChat}
      </div>
    )
    : (
      <div css={top} columns='two' {...props}>
        <div css={top} columns='left'>
          {amosChat}
        </div>
        <AuthBox/>
      </div>
    )
}

export default H.styled (W.GET_AUTH (View)) ``
