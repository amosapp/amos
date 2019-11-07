/* eslint-disable max-lines */
import {R, H, React, CONST} from 'common'

const setErrors = form => fields => () => (
  R.map (field => form.setError (field, ``, CONST.err_topics)) (fields)
)

const isValid = (props) => {

  const

  {results, loading, review, name, form} = props,
  [valid, setValid] = React.useState ([]),
  [checkboxesValid, setCheckboxesValid] = React.useState ([])
  /*
    Set valid on hydration
    Here we're assuming that anything that was in review was in store
    and anything that is in store is valid
  */
  H.useMount (() => {
    name === `prerequisite`
      ? do {
        review?.[name]
          && (R.length (review[name]) > R.length (valid)) && do {
            setValid (R.repeat (true) (R.length (review[name])))
            setCheckboxesValid (R.repeat (true) (R.length (review[name])))
          }
      }
      : do {
        review?.[name]
          && (R.length (review[name]) > R.length (valid))
          && setValid (R.repeat (true) (R.length (review[name])))
      }
  })
  /* eslint-disable no-shadow */
  const setOneValid = key => isValid => {
    setValid (H.update (key) (isValid) (valid))
  },

  setCheckboxesOneValid = key => isValid => {
    setCheckboxesValid (H.update (key) (isValid) (checkboxesValid))
  },

  createOnChange = (fn, key) => (e) => {
    const {target: {value}} = e,
    res = results[name][key],
    /* to be valid, value must be among results */
    isValid = res && (!loading) && R.includes (value) (R.pluck (`text`) (res))
    /* Set validity in state */
    isValid ? setOneValid (key) (true) : setOneValid (key) (false)
    /* In any case run parent (which updates queryConfig) */
    fn (e)
  },

  onChange = H.map (createOnChange) (props.onChange),

  fields = form.watch (name, []),

  // TODO: generalize
  getInvalidField = (acc, val, i) => {
    /* Empty is considered valid */
    const test = !val && H.isNotNilOrEmpty (fields[i])
    return test ? R.append (`${name}[${i}]`) (acc) : acc
  },
  invalidFields = H.reduce (getInvalidField) ([]) (valid),

  isAllValid = R.length (invalidFields) === 0,

  /* After submission */
  [] = [form.formState.isSubmitted && (() => {
    isAllValid
      ? R.not (form.formState.isValid) && form.clearError ()
      : setErrors (form) (invalidFields)
  })()],

  addValidation = cb => (
    isAllValid
      ? cb
      : form.handleSubmit (setErrors (form) (invalidFields))
  ),

  previousValidation = cb => (...args) => do {
    form.unregister (invalidFields)
    cb (...args)
  },

  onSubmit = {}

  onSubmit.previous = previousValidation (props.onSubmit.previous)
  onSubmit.next = addValidation (props.onSubmit.next)
  onSubmit.finish = addValidation (props.onSubmit.finish)

  /* Override valid, onChange and onSubmit */
  return R.mergeAll ([
    {setOneValid, checkboxesValid, setCheckboxesOneValid},
    props,
    {valid, onChange, onSubmit}
  ])
}

export default isValid