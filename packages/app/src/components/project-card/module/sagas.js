import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as projectService from '../../../services/project-card'

import * as types from './types'
import * as actions from './actions'
import * as selectors from './selectors'

const loadTabs = function*() {
  const projectId = yield select(selectors.projectIdSelector)
  yield put(projectService.actions.loadTabs(projectId.projectId))
}

const preSelectTab = function*() {
  const TABS = yield select(selectors.tabsSelector)
  const selectedTab = yield select(selectors.selectedTabsSelector)
  yield put(actions.selectTab(TABS, selectedTab))
}

const emptySaga = function*() {
  const projectId = yield select(selectors.projectIdSelector)
  yield call(console.log, projectId)
}

export default function*() {
  yield all([
    takeEvery('project-card/LOAD_FIELDS_SUCCESS', emptySaga),
    takeLatest('project-card/LOAD_FIELDS_SUCCESS', loadTabs),
    takeLatest('project-card/LOAD_TABS_SUCCESS', preSelectTab),
  ])
}
