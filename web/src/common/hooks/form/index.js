/* eslint-disable indent, max-lines */
import {R} from 'common'
import formOnly from './formOnly'
import submit from './submit'
import multiSubmit from './multi-submit'

export const

form = (formOpts) => (opts) => (
  R.pipe (
    formOnly (formOpts) (opts),
    submit,
  )
),

multiForm = (formOpts) => (opts) => (
  R.pipe (
    formOnly (formOpts) (opts),
    multiSubmit
  )
)