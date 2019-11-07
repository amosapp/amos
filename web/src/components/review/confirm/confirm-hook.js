/* eslint-disable max-lines */
import {
  H, R, React, useMutation, gql, useState, useEffect,
  AmosChat, Button, Topics, Prerequisites
} from 'common'
import {loadReview} from '../review-hook'

const ADD_REVIEW_GQL = gql`
  mutation AddReview ($input: AddReviewInput!) {
    addReview (input: $input) {
      success
      message
    }
  }
`,

RESET_REVIEW_GQL = gql`
  mutation ResetReview {
    resetReview @client
  }
`,

hook = (props) => {
  const {review} = loadReview (props),
  {link, topic, prerequisite} = review,
  url = link?.[0],

  defMessages = [
    `Do you really wanna submit the following review?`,
    <a href={url}>{url}</a>,
    ... H.isNotNilOrEmpty (topic) ? ([
      <span>Resource is on <Topics topics={topic}/>.</span>
    ]) : [],
    ... H.isNotNilOrEmpty (prerequisite) ? ([
      <span>You <Prerequisites prerequisites={prerequisite}/>.</span>
    ]) : []
  ],

  [messages, setMessages] = useState (defMessages),

  [resetReview] = useMutation (RESET_REVIEW_GQL),

  onCompleted = (res) => {
    res.addReview.success
      ? do {
        resetReview()
        H.navto (`/review/thanks`)()
      }
      : do {
        setMessages (R.append (`Something went wrong. Are you sure the URL is correct?`))
      }
  },

  [exec] = useMutation (ADD_REVIEW_GQL, {onCompleted}),

  submitReview = () => {
    const _review = {
      links: link,
      topics: H.isNotNilOrEmpty (topic) && topic,
      prerequisites: H.isNotNilOrEmpty (prerequisite) && do {
        R.map (p => ({
          strength: parseInt (p.strength, 10),
          level: parseInt (p.level, 10),
          topic: p.topic
        })) (prerequisite)
      }
    }
      |> R.filter (R.identity) (#)
    exec ({variables: {input: {..._review}}})
  },

  amosChat = (
    <AmosChat callToAction={
      <>
      <Button onClick={H.navto (`/review/links`)}>
        Edit review
      </Button>
      <Button primary onClick={submitReview}>
        Submit!
      </Button>
      </>
    }>{messages}</AmosChat>
  )

  const onKeyPress = (e) => {
    const {key} = e
    key === `Enter` && do {
      e.preventDefault()
      submitReview()
    }
  }

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  return {amosChat}
}

export default hook