import { success, error } from 'redux-saga-requests'

export const name = 'project-card-service'

export const api = 'http://localhost:3000/'

/*Types*/

const LOAD_PROJECT = `${name}/LOAD_PROJECT`

export const types = {
  LOAD_PROJECT,
}

/*Endpoints*/
const project = api + 'project'
const tabs = api + 'tabs'
const sections = api + 'sections'
const fields = api + 'tabs'

export const endpoints = {
  project,
  tabs,
  sections,
  fields,
}

/* Action creators */
export const actions = {
  loadProject() {
    return {
      type: types.LOAD_PROJECT,
      payload: {
        request: {
          url: `${project}`,
        },
      },
    }
  },
}

function normalizeProject(response) {}

export default function projectCardReducer(state = {}, { type, payload }) {
  switch (type) {
    case success(types.LOAD_PROJECT):
      return payload.data
    default:
      return state
  }
}
