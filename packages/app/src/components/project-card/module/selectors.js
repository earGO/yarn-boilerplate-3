import { createSelector } from 'reselect'
import * as R from 'ramda'

import { namespace } from './types'
import { initialState } from './reducers'
import * as projectCard from '../../../services/project-card'

const projectName = projectCard.name

const stateSelector = state => state[namespace] || initialState
const projectDataSelector = state => state[projectCard.name] || initialState

export const loading = createSelector(
  stateSelector,
  state => state.loading,
)

export const projectSelector = createSelector(
  projectDataSelector,
  state => state,
)
