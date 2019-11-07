import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, setOneValid, onSubmit} = props

  const onEnt = (field) => (key) => (t) => {
    const val = form.getValues()
    if (t === `SUBMIT` || field && H.isNilOrEmpty (val[field])) {
      onSubmit.next
        ? onSubmit.next()
        : onSubmit.finish()
    }
    else {
      form.setValue (field, t)
      setOneValid (key) (true)
    }

    /* So weird that this code doesn't work, maybe a babel bug? */
    // (t === `SUBMIT` || field && H.isNilOrEmpty (val[field]))
    //   ? onSubmit.next
    //     ? onSubmit.next()
    //     : onSubmit.finish()
    //   : (form.setValue (field, t) || setOneValid (key) (true))
  }

  return R.merge ({onEnt}) (props)
}

export default onClick