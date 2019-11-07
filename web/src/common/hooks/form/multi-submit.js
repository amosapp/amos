import {R} from 'common'

const multiSubmit = (props) => {

  const

  {form} = props,

  enhance = arr => (
    form.handleSubmit (input => {
      /* This isn't really necessary */
      // const variables = {input: (R.pick (fields) (input))}
      arr[0] ({variables: {input}})
    })
  ),

  onSubmit = R.map (enhance) (props.onSubmit)

  // /* Override onSubmit */
  return R.merge (props) ({onSubmit})
}

export default multiSubmit