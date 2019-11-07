import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, fields, setOneValid,
    setCheckboxesOneValid,
  } = props,

  /* key is unnested */
  /* _key is nested */
  addOnClick = (field, key) => (e, _key, name, checked) => {
    const {currentTarget: {textContent: t}} = e
    H.isNilOrEmpty (t)
      ? do {
        /* It's a checkbox */
        checked
          ? do {
            /* It is unchecked */
            setCheckboxesOneValid (_key) (false)
          }
          : do {
            /* It is checked */
            name === `strength`
              ? do {
                const {prerequisite} = form.getValues ({nest: true})
                const {level} = prerequisite[_key]
                H.isNotNilOrEmpty (level) && setCheckboxesOneValid (_key) (true)
              }
              : do {
                const {prerequisite} = form.getValues ({nest: true})
                const {strength} = prerequisite[_key]
                H.isNotNilOrEmpty (strength) && setCheckboxesOneValid (_key) (true)
              }
          }
      }
      : do {
        /* It's a dropdown */
        form.setValue (field, t)
        H.isNotNilOrEmpty (_key)
          ? do {
            /* it's a prerequisite */
            setOneValid (_key) (true)
          }
          : do {
            /* it's a topic */
            setOneValid (key) (true)
          }
      }
  },

  /* eslint-disable no-shadow */
  onClick = H.map (addOnClick) (fields)

  return R.merge ({onClick}) (props)
}

export default onClick