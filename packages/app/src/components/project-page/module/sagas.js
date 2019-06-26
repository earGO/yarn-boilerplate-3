import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { success } from 'redux-saga-requests'

import projectCard, { name, api, action } from '../../../services/project-card'
import serverRequests from '../../../utils/serverRequests/serverRequests'
import * as types from './types'

const emptySaga = function*() {
  yield call([console.log, console], 'hello')
}

export default function*() {
  yield all([takeEvery(types.EMPTY, emptySaga)])
}
