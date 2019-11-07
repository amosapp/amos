import {
  H, React, useEffect,
  AmosChat, Button
} from 'common'

const thanksHooks = (props) => {
  const amosChat = (
    <AmosChat callToAction={
      <Button primary onClick={H.navto (`/learn`)}>
        Learn
      </Button>
    }>{props.messages}</AmosChat>
  )

  const onKeyPress = (e) => {
    const {key} = e
    key === `Enter` && do {
      e.preventDefault()
      H.navto (`/learn`) ()
    }
  }

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  return {amosChat}
}

export default thanksHooks