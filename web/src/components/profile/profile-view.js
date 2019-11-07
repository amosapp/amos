import {
  H, React, CONST,
  AmosChat, Button
} from 'common'
import top from './profile-top.sc'
import hook from './profile-hook'

const View = (props) => {
  const {logout} = hook (props)
  return <div css={top} {...props}>
    <AmosChat callToAction={
      <Button primary onClick={logout}>
        Logout
      </Button>}>
      {CONST.profile}
    </AmosChat>
  </div>
}

export default H.styled (View) ``
