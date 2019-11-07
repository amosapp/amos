import {H, R, React} from 'common'
import top from './avatar-top.sc'
import gif from './amos.gif'
import image from './amos-frame-0.png'

const View = ({size, timeout, ...rest}) => {
  const [src, setSrc] = React.useState (gif)

  React.useEffect(() => {
    const timer = setTimeout (() => {
      R.equals (src) (gif) && setSrc (image)
    }, timeout)
    return () => clearTimeout(timer)
  }, [])

  return <img css={top} size={size} src={src} {...rest}/>
}

export default H.styled (View) ``