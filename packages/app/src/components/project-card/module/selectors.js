import { createSelector } from 'reselect'

import { namespace } from './types'
import { initialState } from './reducers'
import * as projectCard from '../../../services/project-card'

const stateSelector = state => state[namespace] || initialState
const serviceDataSelector = state => state[projectCard.name] || initialState

function getProjectTitle(projectObject) {
  if (projectObject !== undefined && projectObject.hasOwnProperty('objectName')) {
    const projectName = projectObject.objectName
    const projectAdress = projectObject.addressGenerated
    return {
      projectName: projectName,
      projectAdress: projectAdress,
    }
  }
}

export const projectLoading = createSelector(
  stateSelector,
  state => state.projectLoading,
)

export const projectSelector = createSelector(
  serviceDataSelector,
  state => state.project,
)

export const projectTitleSelector = createSelector(
  projectSelector,
  state => getProjectTitle(state),
)

export const tabsSelector = createSelector(
  serviceDataSelector,
  state => state.tabs,
)

export const sectionsSelector = createSelector(
  serviceDataSelector,
  state => state.sections,
)

export const fieldsSelector = createSelector(
  serviceDataSelector,
  state => state.fields,
)
