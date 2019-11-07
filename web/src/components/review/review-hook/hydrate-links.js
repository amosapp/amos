import {R, H, React, flatten} from 'common'

const

/**
 * @description adds hydration, onChange and valid
 */
hydrateLinks = (props) => {
  const

  {schema, review, form} = props,

  [valid, setValid] = React.useState (false),

  onChange = async ({target: {value}}) => {
    // See https://github.com/babel/babel/issues/10481
    return (await schema.isValid ({link: [value]}))
      |> setValid
  }

  H.useMount(() => {
    review && (review |> flatten |> R.mapObjIndexed ((val, key) => {
      H.isNotNilOrEmpty (val) && do {
        form.setValue (key, val)
        val !== `Review` && val !== `Prerequisite` && setValid (true)
      }
    }) (#))
  })

  return R.merge ({onChange, valid}) (props)
}

export default hydrateLinks