/* eslint-disable max-lines */
import {R, CONST, validation, hooks} from 'common'
import times from './times'
import onClick from './on-click'
import isValid from './is-valid'
import results from './results'
import config from './config'
import loadReview from './load-review'
import hydrateTopics from './hydrate-topics'
import onSubmit from './on-submit'
import hydrateLinks from './hydrate-links'
import onEnt from './on-ent'

const

message = (name) => ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : R.cond ([
    [R.equals (`link`), R.always (CONST.links)],
    [R.equals (`topic`), R.always (CONST.topics)],
    [R.equals (`prerequisite`), R.always (CONST.prerequisites)]
  ]) (name)
),

/* We need default values
so that at first render everything works :-) */
defaultValues = {
  link: {link: ``},
  topic: {topic: []},
  // prerequisite: {
  // 'prerequisite[0].strength': null,
  // 'prerequisite[0].level': null,
  // 'prerequisite[0].topic': null,
  // },
},

formOpts = name => ({
  ...(validation[name] && {validationSchema: validation[name]}),
  defaultValues: defaultValues[name],
  submitFocusError: false,
  mode: `onBlur`,
}),

opts = name => ({
  // fields: [name],
  name,
  message: message (name),
})

export const

useReview = name => (
  R.pipe (
    onSubmit, // adds onSubmit
    /* Adds {fields, messages, form, schema}
      Overrides onSubmit */
    hooks.multiForm (formOpts (name)) (opts (name)),
    loadReview, // loads Review
  )
),

useReviewLinks = name => (
  R.pipe (
    useReview (name), // see above
    hydrateLinks, // hydrates inputs with review
    onEnt // adds onEnt
  )
),

useReviewTopics = name => (
  R.pipe (
    useReview (name),
    hydrateTopics, // hydrates inputs with review
    config, // adds config, onChange
    results, // adds results, loading
    /* Adds {valid, setOneValid, setValid}
      Overrides onChange, onSubmit */
    isValid,
    onClick, // adds onClick
    onEnt, // adds onEnt
    times // adds times
  )
)

export {loadReview}