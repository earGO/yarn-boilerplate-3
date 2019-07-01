import { success, error } from 'redux-saga-requests'
import { types as serviceTypes } from '../../../services/project-card'
import * as types from './types'

export const initialState = {
  projectLoading: false,
  tabsLoading: false,
  selectedTab: '',
  selectedSection: '',
}

export default {
  [serviceTypes.LOAD_PROJECT]: () => ({
    projectLoading: true,
  }),
  [success(serviceTypes.LOAD_PROJECT)]: () => ({
    projectLoading: false,
  }),
  [error(serviceTypes.LOAD_PROJECT)]: () => ({
    projectLoading: false,
  }),
  [serviceTypes.LOAD_TABS]: () => ({
    tabsLoading: true,
  }),
  [success(serviceTypes.LOAD_TABS)]: () => ({
    tabsLoading: false,
  }),
  [error(serviceTypes.LOAD_TABS)]: () => ({
    tabsLoading: false,
  }),
  [types.PRESELECT_TAB]: (_, { payload }) => {
    const tabs = payload.tabs
    const selectedTab = payload.selectedTab
    if (selectedTab === '') {
      return {
        selectedTab: tabs[0].id,
      }
    } else {
      return {
        selectedTab: selectedTab,
      }
    }
  },
  [types.SELECT_TAB]: (_, { payload }) => ({
    selectedTab: payload.tabId,
  }),
  [types.PRESELECT_SECTION]: (_, { payload }) => {
    const sections = payload.sections
    const selectedSection = payload.selectedSection
    if (selectedSection === '') {
      return {
        selectedTab: sections[0].id,
      }
    } else {
      return {
        selectedSection: selectedSection,
      }
    }
  },
  [types.SELECT_SECTION]: (_, { payload }) => ({
    selectedSection: payload.sectionId,
  }),
}
