import {
  React, gql, useQuery, Link, CONST
} from 'common'

const QUERY_TOPIC = gql`
  query GetResources ($name: String!) {
    getTopResourcesByName (name: $name) {
      type
      url_main
      url_goodreads
      url_download_pdf
      url_download_epub
      url_download_mobi
      typeSpecific_authors
      typeSpecific_goodreadsAvgRating
      typeSpecific_goodreadsNoRatings
      typeSpecific_pages
      typeSpecific_datePublished
      typeSpecific_isbn
      typeSpecific_dewey
      name
      title
      link
      topics {
        names
      }
      prerequisites {
        level
        strength
        topic {
          names
        }
      }
    }
  }
`

const onMenuClick = (e, {item: {url}}) => {
  window.location.href = `${CONST.download_domain}${url}`
}

const hook = props => {
  const {match} = props
  const name = match.params.name
  const options = {
    variables: {name},
    returnPartialData: true,
    fetchPolicy: `cache-and-network`
  }
  const a = useQuery (QUERY_TOPIC, options)
  const data = a.data


  /* eslint-disable max-len */
  const message = [
    <span>Great! Here are some resources for {name}. Help me expand my collection by submitting a <Link to='/review'>Review</Link>.</span>
  ]

  return {message, data, onMenuClick}
}

export default hook