import {H, React, Link} from 'common'

const View = ({
  first = {
    link: `/signup/email`,
    text: `Use email`
  },
  second = {
    link: `/login`,
    text: `Log in`
  }, ...rest}) => (

  <div {...rest}>
    <Link to={first.link}>{first.text}</Link>
    &nbsp;
    {` • `}
    &nbsp;
    <Link to={second.link}>{second.text}</Link>
  </div>
)

export default H.styled (View) ``
