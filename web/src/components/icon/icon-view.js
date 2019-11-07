import {React, styled} from 'common'
import top from './icon-top.sc'
import iconsList from './svg'

function View ({src, book, ...rest}) {
  const svg = typeof src === `string` ? iconsList[src] : src
  if (!svg) {
    throw new Error(`No icon found: '${src}'`)
  }
  return (
    <svg viewBox={svg.viewBox} css={top} {...{book}} {...rest}>
      <use xlinkHref={svg.url}/>
    </svg>
  )
}

export default styled (View) ``
