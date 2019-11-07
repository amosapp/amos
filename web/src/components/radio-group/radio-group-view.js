import {H, React, useCallback} from 'common'
import top from './radio-group-top.sc'
import Radio from './radio'
import Text from './text'
import radioList from './radio-list.sc'

const View = (
  {header, footer, _key, name, elements, form, checked, setChecked, onClick, ...rest}
) => {
  /* eslint-disable no-shadow */
  const _onClick = useCallback ((key) => (e) => {
    checked === key
      ? do {
        setChecked (null)
        onClick (e, true)
      }
      : do {
        setChecked (key)
        onClick (e, false)
      }
  }, [checked, setChecked, onClick])

  return <div css={top} {...rest}>
    {header && <Text>{header}</Text>}
    <div css={radioList} {...rest}>
      {H.map ((element, key) => (
        <label key={key}>
          <Radio
            type='radio'
            value={key}
            checked={checked === key}
            onClick={_onClick (key)}
            ref={form.register}
            {...{name, form}}
          />
          {element}
        </label>
      )) (elements)}
    </div>
    {footer && <Text css={top} {...rest}>{footer}</Text>}
  </div>
}

export default H.styled (View) ``