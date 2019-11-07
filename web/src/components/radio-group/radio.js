import {H, React, forwardRef} from 'common'

const Radio = ({...rest}, ref) => (
  <input ref={ref} {...rest}/>
)

export default H.styled (forwardRef (Radio)) ``