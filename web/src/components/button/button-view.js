import {
  H, React,
  Icon
} from 'common'
import Text from './text'
import top from './button-top.sc'

const View = ({icon, children, ...rest}) => (
  <button css={top} {...rest}>
    {icon && <Icon src={icon}/>}
    {children && <Text>{children}</Text>}
  </button>
)

export default H.styled (View) ``
