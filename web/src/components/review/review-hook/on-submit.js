import {R, H, useMutation, gql} from 'common'

const

structure = {
  links: {
    next: `topics`
  }, topics: {
    previous: `links`,
    next: `prerequisites`,
    finish: `confirm`
  }, prerequisites: {
    previous: `topics`,
    finish: `confirm`
  }
},

ADD_REVIEW_CLIENT_GQL = gql`
  mutation AddReviewClient {
    addReview (input: $input) @client
  }
`,

/**
 * @description creates onSubmit
 */
onSubmit = (props) => {
  const

  /* Setup */
  {match} = props,
  page = R.pipe (R.prop (`url`), R.split (`/`), R.nth (2)) (match),

  /* Mutation */
  [exec] = useMutation (ADD_REVIEW_CLIENT_GQL),

  /* create onSubmit */
  obj = structure[page],
  previous = obj.previous && (H.intercept (H.navto (`/review/${obj.previous}`)) (exec) |> R.of),
  next = obj.next && (H.intercept (H.navto (`/review/${obj.next}`)) (exec) |> R.of),
  finish = obj.finish && (H.intercept (H.navto (`/review/${obj.finish}`)) (exec) |> R.of),

  /* eslint-disable no-shadow */
  onSubmit = R.filter (R.identity) ({previous, next, finish})
  return R.merge ({onSubmit}) (props)
}

export default onSubmit