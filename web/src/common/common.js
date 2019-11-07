/* eslint-disable */
// import * as R from 'ramda'
// export {R}
export * as R from 'ramda'
export * as yup from 'yup'
export styled, {css} from 'styled-components'
export React, {useState, useContext, useEffect, useMemo, useRef, forwardRef, useCallback} from 'react'
export {Link, NavLink, Switch, Redirect, Router, Route, withRouter} from 'react-router-dom'
export useForm, {FormContext, useFormContext} from 'react-hook-form'
export {Cookies, CookiesProvider, useCookies} from 'react-cookie'
export {InMemoryCache} from 'apollo-cache-inmemory'
export {gql} from 'apollo-boost'
// Hack, see https://github.com/apollographql/apollo-client/issues/4843#issuecomment-495585495
// TODO: Migrate to ApolloClient@3.0.0 (will be released in Nov 19)
export ApolloClient from 'apollo-boost/lib/index'
export {ApolloProvider, useQuery, useLazyQuery, useMutation} from '@apollo/react-hooks'
export {useQueryParam, NumberParam, StringParam} from 'use-query-params'
export {flatten} from 'flattenjs'

/* /common */
export H from './helpers'
export CONST from './const'
export * as validation from './validation'
export hooks from './hooks'
export W from './with'

/* /apollo */

/* External */
// import ReactTooltip from 'react-tooltip'

/* No dependencies */
export Icon from 'components/icon'
export AuthOptions from 'components/auth-box/auth-options'
export Checkbox from 'components/checkbox'
export Input from 'components/input'
export NavMenu from 'components/nav-menu'
export NotFound from 'components/not-found'
export RadioGroup from 'components/radio-group'
export Title from 'components/title'
export Hr from 'components/hr'
export SplitButton from 'components/split-button'
export Topics from 'components/topics'
export Prerequisites from 'components/prerequisites'
export Panel from 'components/panel'

/* Icon */
export Button from 'components/button'

/* Button */
export AmosChat from 'components/amos-chat'
export AuthBox from 'components/auth-box'

/* NavMenu, Footer */
export PageLayout from 'components/page-layout'

/* Pages */
export About from 'components/about'
export Login from 'components/login'
export Profile from 'components/profile'
export Review from 'components/review'
export Learn from 'components/learn'
export Signup from 'components/signup'
export OpenSearch from 'components/open-search'
export Topic from 'components/topic'
