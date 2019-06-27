import { endpoints } from '../../../services/project-card'
import * as types from './types'

export function loadTabs() {
  return {
    type: types.LOAD_TABS,
    payload: {
      request: {
        url: `${endpoints.tabs}`,
      },
    },
  }
}

export function loadSections() {
  return {
    type: types.LOAD_SECTIONS,
    payload: {
      request: {
        url: `${endpoints.sections}`,
      },
    },
  }
}

export function loadFields() {
  return {
    type: types.LOAD_FIELDS,
    payload: {
      request: {
        url: `${endpoints.fields}`,
      },
    },
  }
}
