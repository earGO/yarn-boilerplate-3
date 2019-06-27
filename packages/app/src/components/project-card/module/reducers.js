import { success, error } from 'redux-saga-requests'
import { types as serviceTypes } from '../../../services/project-card'

export const initialState = {
  projectLoading: false,
  tabsLoading: false,
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
}
