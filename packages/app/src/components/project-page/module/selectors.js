import { createSelector } from 'reselect'
import * as R from 'ramda'

import { namespace } from './types'
import { initialState } from './reducers'
import * as projectCard from '../../../services/project-card'

const stateSelector = state => state[namespace] || initialState

export const loading = createSelector(
  stateSelector,
  state => state.loading,
)
