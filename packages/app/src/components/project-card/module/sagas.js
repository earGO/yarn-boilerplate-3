import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as projectService from '../../../services/project-card'

import * as types from './types'
import * as actions from './actions'
import * as selectors from './selectors'

/*It takes Project ID from loaded project, and loads tabs array on it*/
const loadTabs = function*() {
  const projectId = yield select(selectors.projectIdSelector)
  yield put(projectService.actions.loadTabs(projectId.projectId))
}

const loadSections = function*() {
  const tabId = yield select(selectors.selectedTabsSelector)
  console.log(tabId)
  yield put(projectService.actions.loadSections(tabId))
}

/*It preselects a tab based on current state and */
const preSelectTab = function*() {
  const TABS = yield select(selectors.tabsSelector)
  const selectedTab = yield select(selectors.selectedTabsSelector)
  yield put(actions.preselectTab(TABS, selectedTab))
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
    takeLatest('@ursip-project-card/PRESELECT_TAB', loadSections),
  ])
}
