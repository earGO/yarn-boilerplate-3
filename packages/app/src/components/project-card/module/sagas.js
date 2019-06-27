import { all, call, takeEvery } from 'redux-saga/effects'

import * as types from './types'

const emptySaga = function*() {
  yield call([console.log, console], 'hello')
}

export default function*() {
  yield all([takeEvery(types.EMPTY, emptySaga)])
}
