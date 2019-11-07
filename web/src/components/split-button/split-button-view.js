import {H, React} from 'common'
import SplitButton from '@zippytech/react-toolkit/SplitButton'
import '@zippytech/react-toolkit/SplitButton/index.css'
import top from './split-button-top.sc'

const View = ({children, ...rest}) => {
  return (
    <SplitButton css={top}
      {...rest}
    >
      {children}
    </SplitButton>
  )
}

export default H.styled (View) ``