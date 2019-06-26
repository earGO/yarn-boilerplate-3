import { namespace } from './types'
import reducers, { initialState } from './reducers'
import sagas from './sagas'

import * as actions from './actions'

import * as nsiNew from '../../../services/nsi-new'

export const baseRoute = '/nsi'

export default {
  id: namespace,
  reducerMap: {
    [nsiNew.name]: nsiNew.default,
    [namespace]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [sagas],
  initialActions: [nsiNew.actions.loadAllCatalogs(), actions.getUserSettingsFromLocalStorage()],
}
