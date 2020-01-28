import {React} from 'common'

export const

useMount = mount => React.useEffect(
  () => {
    mount()
  }, []
),

useUnmount = unmount => React.useEffect(
  () => () => {
    unmount && unmount()
  }, []
)
