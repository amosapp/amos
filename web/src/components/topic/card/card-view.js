import {
  React, R, H, CONST,
  Icon, SplitButton, Topics, Prerequisites
} from 'common'
import top from './card-top.sc'

const View = (props) => {
  const {res, onMenuClick} = props
  const icon = R.cond ([
    [R.equals (`BOOK`), R.always (`book`)],
    [R.equals (`ONLINE_COURSE`), R.always (`online_course`)],
    [R.equals (`LECTURE_NOTES`), R.always (`lecture_notes`)],
    [R.T, R.always (null)]
  ]) (res.type)
  const link = res.link || res.url_main || res.url_goodreads
  const title = res.name || res.title
  const downloads = [res.url_download_pdf, res.url_download_epub, res.url_download_mobi]
  const strings = [`PDF`, `EPUB`, `MOBI`]
  const download = R.reduce ((acc, val) => acc || val) (false) (downloads)

  const items = H.reduce ((acc, val, _key) => (
    val ? R.append ({label: strings[_key], url: val}) (acc) : acc
  )) ([]) (downloads)
  const onClick = () => window.location.href = `${CONST.download_domain}${items?.[0]?.url}`
  const {topics, prerequisites} = res
  return <div css={top}>
    {icon && <div>TYPE: <Icon src={icon} book/></div>}
    {title && (
      <a target='_blank' href={link}>
        <h3><i>{title}</i></h3>
      </a>
    )}
    {download &&
      <SplitButton {...{items, onClick, onMenuClick}}>
        View
      </SplitButton>
    }
    {res.typeSpecific_authors && <p>By {res.typeSpecific_authors}</p>}
    {res.typeSpecific_datePublished && <p>published in {res.typeSpecific_datePublished}</p>}
    {res.typeSpecific_goodreadsAvgRating && <p>Avg. rating: {res.typeSpecific_goodreadsAvgRating}</p>}
    {res.typeSpecific_goodreadsNoRatings && <p># of ratings: {res.typeSpecific_goodreadsNoRatings}</p>}
    {res.typeSpecific_pages && <p>{res.typeSpecific_pages} p.</p>}
    {res.typeSpecific_isbn && <p>ISBN: {res.typeSpecific_isbn}</p>}
    {H.isNotNilOrEmpty (topics) && <p>
      {R.length (topics) === 1 ? `Topic:` : `Topics:`} <Topics topics={R.pluck (`names`) (topics)}/>.
    </p>}
    {H.isNotNilOrEmpty (prerequisites) && <p>People told me they <Prerequisites {...{prerequisites}}/>.</p>}
    {/* {res.typeSpecific_dewey && <p>{res.typeSpecific_dewey}</p>}} */}
  </div>
}

export default H.styled (View) ``