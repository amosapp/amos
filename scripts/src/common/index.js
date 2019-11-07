import * as R from 'ramda'
import * as H from './helpers'
import {v1 as neo4j} from 'neo4j-driver'
import fetch from 'node-fetch'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import {HttpLink, createHttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import Promise from 'bluebird'
import coreJs from 'core-js/stable'
import regenerator from 'regenerator-runtime/runtime'

import parser from '@solviofoundation/amos-parser'
import topics from '@solviofoundation/amos-topics'
import reviews from '@solviofoundation/amos-reviews'

export {
  R,
  H,
  neo4j,
  ApolloClient,
  gql,
  fetch,
  HttpLink,
  createHttpLink,
  setContext,
  InMemoryCache,
  Promise,
  coreJs,
  regenerator,
  parser,
  topics,
  reviews,
}