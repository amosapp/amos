import {R, H, flatten} from 'common'

const

/* eslint-disable indent */
/**
 * @description Hydrates inputs on mount
 */
hydrate = (props) => {

  const

  {review, form, name, setOneChecked} = props

  H.useMount(() => {
    review && do {
      review |> flatten |> R.mapObjIndexed ((val, key) => {
      H.isNotNilOrEmpty (val) && form.setValue (key, val)
    }) (#)

      name === `prerequisite` && review.prerequisite && do {
        const strengths = R.pluck (`strength`) (review.prerequisite)
        H.map ((val, key) => setOneChecked (3 * key) (parseInt (val, 10))) (strengths)
        const levels = R.pluck (`level`) (review.prerequisite)
        H.map ((val, key) => setOneChecked (3 * key + 1) (parseInt (val, 10))) (levels)
      }
    }
  })

  return props
}

export default hydrate