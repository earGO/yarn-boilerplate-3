import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { success } from 'redux-saga-requests'
import * as projectService from '../../../services/project-card'

import * as types from './types'
import * as actions from './actions'
import * as selectors from './selectors'

/*It takes Project ID from loaded project, and loads tabs array on it*/
const loadTabs = function*() {
  const projectId = yield select(selectors.projectIdSelector)
  yield put(projectService.actions.loadTabs(projectId.projectId))
}
/*it loads sections based on current selected tabid*/
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

/*It preselects a tab based on current state and */
const preSelectSection = function*() {
  const sections = yield select(selectors.sectionsSelector)
  yield put(actions.preselectSection(sections))
}

export default function*() {
  yield all([
    takeLatest(success(projectService.types.LOAD_PROJECT), loadTabs),
    takeLatest(success(projectService.types.LOAD_TABS), preSelectTab),
    takeLatest(types.PRESELECT_TAB, loadSections),
    takeEvery(success(projectService.types.LOAD_SECTIONS), preSelectSection),
    takeEvery(types.SELECT_TAB, loadSections),
  ])
}
