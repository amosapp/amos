import {
  React, R, H,
  AmosChat
} from 'common'
import hook from './topic-hook'
import Card from './card'

const View = (props) => {
  const {message, data, onMenuClick} = hook (props)
  return (
    <div>
      <AmosChat>
        {message}
      </AmosChat>
      {H.isNotNilOrEmpty (data)
        ? H.map ((res, key) => <Card key={key} {...{res, onMenuClick}}/>) (R.sort ((res1, res2) => (
          res1.title
            ? -1
            : res1.typeSpecific_goodreadsNoRatings
              ? res2.typeSpecific_goodreadsNoRatings
                ? res2.typeSpecific_goodreadsNoRatings - res1.typeSpecific_goodreadsNoRatings
                : 1
              : -1
        )) (data.getTopResourcesByName))
        : null
      }
    </div>
  )
}

export default H.styled (View) ``