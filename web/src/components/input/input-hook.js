/* eslint-disable max-lines */
import {
  R, H, useEffect, useState, useCallback, useRef,
} from 'common'

const hook = (props) => {
  const

  {valid: isValid = false, results, noDropdown = false, onEnt, dontFocus, ref} = props,

  [dropdown, setDropdown] = useState (true),
  [valid, setValid] = useState (false),

  [] = [!valid && isValid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  onKeyPress = useCallback ((e) => {
    const {key} = e
    /* Use this if there is no results, no dropdown or if it's disabled
    (otherwise use <Dropdown>'s onKeyPress */
    if (!results || !dropdown || noDropdown) {
      key === `Enter` && onEnt && onEnt () () (`SUBMIT`)
    }
  }, [dropdown, noDropdown, onEnt])

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener(`keypress`, onKeyPress)
  }, [onKeyPress])

  const _onClick = (e) => {
    // console.log (`_onClick`)
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setDropdown (true)
  }

  const inputRef = useRef()

  const forwardRef = e => {
    ref (e)
    inputRef.current = e
  }

  const onBlur = () => setDropdown (false)

  H.useMount(() => {
    !dontFocus && inputRef.current.focus()
    document.addEventListener (`click`, onBlur)
  })

  H.useUnmount (() => {
    document.addEventListener (`click`, onBlur)
  })

  const [active, setActive] = useState (0)

  /* Using pattern described in
  https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks */
  const handleUserKeyPress = useCallback ((e) => {
    inputRef.current === document.activeElement && do {
      R.cond ([
        [R.equals (`Escape`),
          () => (e.preventDefault() || inputRef.current.blur() || setDropdown (false))],
        [R.equals (`ArrowUp`),
          () => (e.preventDefault() || setActive (R.pipe (R.dec, R.max (0))))],
        [R.equals (`ArrowDown`),
          () => (e.preventDefault() || setActive (R.pipe (R.inc, R.min (R.length (results) - 1))))],
        [R.T, R.T]
      ]) (e.key)
    }
  }, [results])

  useEffect(() => {
    /* Using keydown here
    bc w/ keyup preventDefault doesn't work */
    inputRef.current.addEventListener (`keydown`, handleUserKeyPress)

    return () => inputRef.current.removeEventListener (`keydown`, handleUserKeyPress)
  }, [handleUserKeyPress])

  return {_onClick, forwardRef, dropdown, active}
}

export default hook