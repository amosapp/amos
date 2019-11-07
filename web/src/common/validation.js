/* Note: Until this logic is lifted, all changes here
 * should be mirrored in /api/common/validation! */
import {R, yup, CONST} from 'common'

const {string, object, array} = yup

export const

RESERVED_PATHS = [
  `profile`, `review`, `reviews`, `signup`, `login`, `topic`, `topics`, `topic-graph`,
  `resource`, `resources`, `admin`, `bot`, `solvio`, `solviofoundation`,
  `home`, `callback`, `success`, `thanks`, `settings`, `help`, `news`, `newsfeed`,
  `feed`, `search`, `discover`, `explore`, `proposals`, `proposal`, `dashboard`,
  `terms`, `privacy`, `sponsors`, `about`, `school`, `schools`, `courses`, `logout`,
  `bootcamp`, `bootcamps`, `api`, `forum`, `new`, `groups`, `rules`, `user`, 
],

noAt = R.complement (R.includes (`@`)),

username = string()
  .min(3)
  .max(16)
  .notOneOf (RESERVED_PATHS, `That username is a reserved path 😕`)
  .test(``, `This is not a valid email and username can't have '@'.`, noAt)
  .label(`Username`)
  .required(),

usernameOnly = object()
  .shape ({
    username
  }),

email = string()
  .email()
  .label(`Email`)
  .required(),

password = string()
  .min(6)
  .label(`Password`)
  .required(),

/* Need to use non-arrow function per
  https://github.com/jquense/yup#mixedtestname-string-message-string--function-test-function-schema */
validateUsernameOrEmail = async function (str) {
  if (await email.isValid (str)) {
    return true
  }
  try {
    await username.label(`Username or email`).validate (str)
    return true
  }
  catch ({message}) {
    return await this.createError ({message})
  }
},

usernameOrEmail = string()
  /* We don't need name and message (first two args)
    because we'll be creating an error in `validateUsernameOrEmail` */
  .test (``, ``, validateUsernameOrEmail),

/* Extend signup */
signup = object().shape ({
  username, email, password,
  repeatPassword: string().oneOf([yup.ref(`password`)], CONST.passwords_dont_match),
}),

login = object().shape ({usernameOrEmail, password}),

_link = string().url (
  `Link must be a valid URL (must start with http:// or https://).`
).required (`A link is required!`),
link = object().shape ({link: array().of (_link)})
