import { createSelector } from 'reselect'
import * as R from 'ramda'

import { namespace } from './types'
import { initialState } from './reducers'
import * as projectCard from '../../../services/project-card'

const projectName = projectCard.name

const stateSelector = state => state[namespace] || initialState
const projectDataSelector = state => state[projectCard.name] || initialState

function getProjectTitle(projectObject) {
  const projectName = projectObject.objectName
  const projectAdress = projectObject.addressGenerated
  return {
    projectName: projectName,
    projectAdress: projectAdress,
  }
}

export const projectLoading = createSelector(
  stateSelector,
  state => state.projectLoading,
)

export const projectSelector = createSelector(
  projectDataSelector,
  state => state,
)
export const projectTitleSelector = createSelector(
  projectDataSelector,
  state => getProjectTitle(state),
)
