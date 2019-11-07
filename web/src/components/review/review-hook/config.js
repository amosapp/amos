import {R, H, React} from 'common'

const

/**
 * @description adds config and onChange
 */
config = (props) => {
  const

  {fields} = props,

  /* eslint-disable no-shadow */
  [config, setConfig] = React.useState ({skip: true})
  const createOnChange = (field, key) => ({target: {name, value}}) => {
    value |> H.isNotNilOrEmpty
      ? setConfig ({
        key,
        field: name,
        variables: {input: {str: value, first: 4}},
        skip: false
      })
      : setConfig ({
        key,
        skip: true
      })
  },

  onChange = H.map (createOnChange) (fields)
  return R.merge ({config, onChange}) (props)
}

export default config