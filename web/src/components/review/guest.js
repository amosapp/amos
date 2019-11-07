import {
  React, H, useEffect, CONST,
  AmosChat, AuthBox, Button,
} from 'common'
import top from './review-top.sc'

const onKeyPress = (e) => {
  const {key} = e
  key === `Enter` && do {
    e.preventDefault()
    H.navto (`/review/links`) ()
  }
}

const Guest = ({...rest}) => {
  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  return <div css={top} {...rest} columns='two'>
    <div css={top} columns='left' {...rest}>
      <AmosChat callToAction={
        <Button onClick={H.navto (`/review/links`)}>
          Submit anonymously
        </Button>
      }>
        {CONST.review}
      </AmosChat>
    </div>
    <AuthBox/>
  </div>
}

export default H.styled (Guest) ``