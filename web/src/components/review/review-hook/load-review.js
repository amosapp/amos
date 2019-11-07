import {R, H, useQuery, gql} from 'common'

const

GET_REVIEW_CLIENT_GQL = gql`
  query {
    review @client {
      link
      topic
      prerequisite {
        strength
        level
        topic
      }
    }
  }
`,

/* eslint-disable indent */
/**
 * @description Hydrates inputs on mount
 */
loadReview = (props) => {

  const

  onCompleted = ({review}) => {
    /* Jump to beginning if links don't exist */
    review?.link || props.match.url === `/review/links` || H.navto (`/review`) ()
  },

  // TODO: Change to false
  {data: {review}} = useQuery (GET_REVIEW_CLIENT_GQL, {returnPartialData: true, onCompleted})

  return R.merge ({review}) (props)
}

export default loadReview