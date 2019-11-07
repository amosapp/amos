import {H, React} from 'common'
import top from './checkbox-top.sc'
import checkbox from './checkbox.sc'

const View = ({children, ...rest}) => (
  <div css={top} {...rest}>
    <span css={checkbox} size={20} border={2}>
      <input type='checkbox' defaultChecked/>
    </span>
    {children}
  </div>
)

export default H.styled (View) ``