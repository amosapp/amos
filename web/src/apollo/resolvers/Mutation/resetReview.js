const resetReview = (_, $, {cache}) => {
  cache.writeData ({data: {review: {__typename: `Review`, link: null, topic: [], prerequisites: [{
    __typename: `Prerequisite`,
    strength: null,
    level: null,
    topic: null
  }]}}})
}

export default resetReview