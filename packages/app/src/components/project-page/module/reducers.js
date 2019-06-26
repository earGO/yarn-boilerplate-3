import { success, error } from 'redux-saga-requests'
import { types as serviceTypes } from '../../../services/project-card'
import * as types from './types'

export const initialState = {
  loading: false,
}

export default {
  [serviceTypes.LOAD_PROJECT]: () => ({
    loading: true,
  }),
  [success(serviceTypes.LOAD_PROJECT)]: () => ({
    loading: false,
  }),
  [error(serviceTypes.LOAD_PROJECT)]: () => ({
    loading: false,
  }),
}
