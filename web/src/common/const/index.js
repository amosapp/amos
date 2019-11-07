import H from '../helpers'

/* Matches "everything" except ./index.js */
export default require.context (`.`, true, /\.\/(?!index).+\.js/)
  |> H.importContext
