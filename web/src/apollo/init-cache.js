import {H, R, Cookies} from 'common'

const initCache = client => {
  const

  /* Default data */
  {cache} = client,
  defaultData = {
    isAuthenticated: false,
    review: {
      __typename: `Review`,
      link: null,
      topic: [],
    }
  },
  [] = [client.onResetStore = () => cache.writeData ({data: defaultData})],

  /* Initial Data */
  auth = (new Cookies()).get (`auth`),
  initialDataFragment =
    H.isNotNilOrEmpty (auth)
      ? {isAuthenticated: true}
      : {},
  initialData = R.merge (defaultData) (initialDataFragment)

  cache.writeData ({data: initialData})
}

export default initCache