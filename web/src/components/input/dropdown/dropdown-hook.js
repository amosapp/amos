import {
  React, useState, useCallback, useEffect, Link, H
} from 'common'

const hook = (props) => {
  const {results, onClick, link, name, active, _key, onEnt} = props,
  [_active, _setActive] = useState (active),

  onKeyPress = useCallback ((e) => {
    const {key} = e
    key === `Enter` && onEnt && results && do {
      e.preventDefault()
      onEnt (name) (_key) (results?.[_active]?.text)
    }
  }, [results, _active])

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  useEffect (() => {
    H.neq (_active) (active) && _setActive (active)
  }, [active])

  const renderResults = (result, key) => {
    const {text} = result

    const label = (
      /* eslint-disable max-len */
      /*
       * Using onMouseDown here, otherwise onBlur interferes
       * See https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
      */
      <label className='dropdown' onMouseDown={onClick}>
        <span className={_active === key ? `active` : ``}
          onMouseEnter={() => H.neq (_active) (key) && _setActive (key)}
          onMouseLeave={() => H.neq (_active) (active) && _setActive (active)}
        >
          {text}
        </span>
      </label>
    )

    const optionallyWrap = (wrap) => (
      wrap ? <Link to={`/topic/${text}`}> {label} </Link> : label
    )

    return (
      <React.Fragment key= {`wrapper${key}`}>
        {optionallyWrap (link)}
      </React.Fragment>
    )
  }

  return {renderResults}
}

export default hook