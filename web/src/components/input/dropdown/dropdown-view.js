import {
  React, H
} from 'common'
import hook from './dropdown-hook'
import top from './dropdown-top'

const View = (props) => {
  const {results} = props,
  {renderResults} = hook (props)

  return (
    <div css={top} {...props}>
      <div className='dropdown'>
        {H.safeMap (renderResults) (results)}
      </div>
    </div>
  )
}

export default H.styled (View) ``