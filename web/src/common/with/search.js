import {React, gql, R, H, useForm, useQuery} from 'common'

export const

QUERY_SEARCH = gql`
  query Autocomplete($input: AutocompleteInput!) {
    autocomplete (input: $input) {
      results {
        name
      }
    }
  }
`,

search = C => ({...rest}) => {
  const

  {watch, register, handleSubmit} = useForm(),
  {str} = watch(),

  skip = R.complement (H.isNotNilOrEmpty) (str),

  {data} = useQuery (QUERY_SEARCH, {variables: {input: {str, first: 8}}, skip}),

  results = data
    ? R.map (r => ({name: r.name, text: r.name})) (data.autocomplete.results)
    : null,

  onEnt = () => () => (text) => H.navto (`/topic/${text}`) (),

  onSubmit = handleSubmit(() => {})

  return (
    <C {...rest} {...{onEnt, results, register, onSubmit}} />
  )
}