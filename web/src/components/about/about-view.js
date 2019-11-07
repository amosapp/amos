import {
  React, H, useEffect, CONST,
  AmosChat, Button
} from 'common'

const View = () => {
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

  return <AmosChat avatar='large' callToAction={
    <>
    <Button onClick={H.navto (`/signup`)}>
      Sign up
    </Button>
    <Button primary onClick={H.navto (`/learn`)}>
      Learn
    </Button>
    </>
  }>
    {CONST.about}
  </AmosChat>
}

export default H.styled (View) ``