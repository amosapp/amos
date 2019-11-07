import {R, H, React, useQuery, gql} from 'common'

const

QUERY_SEARCH = gql`
  query Autocomplete($input: AutocompleteInput!) {
    autocomplete (input: $input) {
      results {
        name
      }
    }
  }
`,

defResults = {topic: [], prerequisite: []},

/**
 * @description Sets up Query for Search
 */
results = (props) => {
  const

  /* eslint-disable no-shadow */
  [results, setResults] = React.useState (defResults),
  {config, name} = props,

  parseResults = data => {
    const _results = data
      && H.map (res => ({name: res.name, text: res.name})) (data.autocomplete.results)
    return {[name]: H.update (config.key) (_results) (results[name])}
  },

  /* If input is empty (signified by config.skip) set results to empty array */
  [] = [
    config.skip && H.isNotNilOrEmpty (results?.[name]?.[config.key])
      && setResults ({[name]: H.update (config.key) ([]) (results[name])})
  ],

  onCompleted = R.pipe (parseResults, setResults),

  _config = {
    /* Pick only those keys that apollo cares about */
    ...R.pick ([`variables`, `skip`]) (config),
    /* ...And add onCompleted */
    onCompleted
  },
  {loading} = useQuery (QUERY_SEARCH, _config)

  return R.merge ({results, loading}) (props)
}

export default results