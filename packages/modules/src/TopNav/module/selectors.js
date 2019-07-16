import {createSelector} from 'reselect'

import {namespace} from './types'
import {initialState} from './reducers'

const namespaceStateSelector = state => state[namespace] || initialState
