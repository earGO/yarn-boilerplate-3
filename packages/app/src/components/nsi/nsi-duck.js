import { createSelector } from 'reselect'
import { all, put, select, takeEvery, delay } from 'redux-saga/effects'
import { success, error } from 'redux-saga-requests'
import * as nsiService from '../../services/nsi'
import * as nsiNew from '../../services/nsi-new'

import * as R from 'ramda'

const name = 'nsi'
const baseRoute = '/nsi'

const DEFAULT_SORT = {
  column: null,
  order: 'desc',
}

const initialState = {
  loading: false,
  searchQuery: '',
  catalogSearchQuery: '',
  catalogsSideWidth: 350,
  sort: DEFAULT_SORT,
  currentDict: null,
  loadingElements: false,
  currentElement: null,
  showElementsModal: false,
  expandedRowKeys: [],
}

/** Internal types */
const SEARCH_CATALOGS = `${name}/SEARCH_CATALOGS`
const SET_SIDE_WIDTH = `${name}/SET_SIDE_WIDTH`
const SEARCH_IN_CATALOG = `${name}/SEARCH_IN_CATALOG`
const SORT = `${name}/SORT`
const SET_CURRENT_DICT = `${name}/SET_CURRENT_DICT`
const SHOW_ELEMENTS_FORM = `${name}/SHOW_ELEMENTS_FORM`
const HIDE_ELEMENTS_FORM = `${name}/HIDE_ELEMENTS_FORM`

const types = {
  SEARCH_CATALOGS,
  SET_SIDE_WIDTH,
  SEARCH_IN_CATALOG,
  SORT,
  SET_CURRENT_DICT,
  SHOW_ELEMENTS_FORM,
  HIDE_ELEMENTS_FORM,
}

/** Action creators */
const actions = {
  searchCatalogs(query) {
    return {
      type: types.SEARCH_CATALOGS,
      payload: {
        query,
      },
    }
  },
  searchInCatalog(query) {
    return {
      type: types.SEARCH_IN_CATALOG,
      payload: {
        query,
      },
    }
  },
  setSideWidth(width) {
    return {
      type: types.SET_SIDE_WIDTH,
      payload: {
        width,
      },
    }
  },
  setCurrentDict(nick) {
    return {
      type: types.SET_CURRENT_DICT,
      payload: {
        nick,
      },
    }
  },
  showElementsForm(row) {
    return {
      type: types.SHOW_ELEMENTS_FORM,
      payload: {
        row,
      },
    }
  },
  hideElementsForm() {
    return {
      type: types.HIDE_ELEMENTS_FORM,
    }
  },
  sort({ column, order }) {
    return {
      type: types.SORT,
      payload: {
        column,
        order,
      },
    }
  },
}

/** Reducers */
const reducers = {
  [nsiService.types.LOAD_DICTS]: () => ({
    loading: true,
  }),
  [success(nsiService.types.LOAD_DICTS)]: () => ({
    loading: false,
  }),
  [error(nsiService.types.LOAD_DICTS)]: () => ({
    loading: false,
  }),

  [nsiService.types.LOAD_DICT_ELEMENTS]: () => ({
    loadingElements: true,
  }),
  [success(nsiService.types.LOAD_DICT_ELEMENTS)]: () => ({
    loadingElements: false,
  }),
  [error(nsiService.types.LOAD_DICT_ELEMENTS)]: () => ({
    loadingElements: false,
  }),
  [types.SEARCH_CATALOGS]: (_, { payload }) => ({
    searchQuery: payload.query,
  }),
  [types.SEARCH_IN_CATALOG]: (_, { payload }) => ({
    catalogSearchQuery: payload.query,
  }),
  [types.SET_SIDE_WIDTH]: (_, { payload }) => ({
    catalogsSideWidth: parseInt(payload.width),
  }),
  [types.SORT]: (state, { payload }) => ({
    sort: payload.order === state.sort.order && payload.column === state.sort.column ? DEFAULT_SORT : payload,
  }),
  [types.SET_CURRENT_DICT]: (_, { payload }) => ({
    currentDict: payload.nick,
    sort: DEFAULT_SORT,
    catalogSearchQuery: '',
  }),
  [types.SHOW_ELEMENTS_FORM]: (_, { payload }) => ({
    currentElement: payload.row,
    showElementsModal: true,
  }),
  [types.HIDE_ELEMENTS_FORM]: (_, { payload }) => ({
    currentElement: null,
    showElementsModal: false,
  }),
}

const SORTERS = {
  string: (a, b) => new Intl.Collator('ru', { numeric: true }).compare(a, b),
  number: (a, b) => b - a,
  integer: (a, b) => b - a,
  link: () => {},
  boolean: (a, b) => {
    if (typeof a !== 'string') {
      return 1
    }
    if (typeof b !== 'string') {
      return -1
    }
    return b.localeCompare(a)
  },
}

/** Selectors */
const stateSelector = state => state[name] || initialState
const nsiServiceSelector = state => state[nsiService.name] || []
const loadingSelector = createSelector(
  stateSelector,
  state => state.loading,
)
const loadingElementsSelector = createSelector(
  stateSelector,
  state => state.loadingElements,
)
const searchQuerySelector = createSelector(
  stateSelector,
  state => state.searchQuery,
)
const catalogSearchQuerySelector = createSelector(
  stateSelector,
  state => state.catalogSearchQuery,
)
const sortSelector = createSelector(
  stateSelector,
  state => state.sort,
)
const currentDictNickSelector = createSelector(
  stateSelector,
  state => state.currentDict,
)
const availableCatalogsSelector = createSelector(
  nsiServiceSelector,
  catalogs => catalogs.filter(catalog => !Boolean(catalog.deleted)),
)
const catalogsSideWidthSelector = createSelector(
  stateSelector,
  state => state.catalogsSideWidth,
)
const filteredCatalogsSelector = createSelector(
  availableCatalogsSelector,
  searchQuerySelector,
  (catalogs, searchQuery) =>
    catalogs.filter(catalog =>
      String(catalog.name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ),
)
const currentCatalogSelector = createSelector(
  availableCatalogsSelector,
  currentDictNickSelector,
  (catalogs, nick) => catalogs.find(catalog => catalog.nick === nick) || {},
)

const byNickSelector = nick =>
  createSelector(
    availableCatalogsSelector,
    catalogs => catalogs.find(catalog => catalog.nick === nick) || {},
  )

const groupedCatalogsSelector = createSelector(
  filteredCatalogsSelector,
  catalogs => R.groupBy(catalog => catalog.sysName)(catalogs),
)
const tableAttributesSelector = createSelector(
  currentCatalogSelector,
  catalog => ((catalog && catalog.attributes) || []).filter(attr => !attr.deleted),
)
const tableElementsSelector = createSelector(
  currentCatalogSelector,
  catalog => (catalog && catalog.elements && catalog.elements.filter(elem => !elem.deleted)) || [],
)
const tableDataSelector = createSelector(
  tableAttributesSelector,
  tableElementsSelector,
  catalogSearchQuerySelector,
  sortSelector,
  (attributes, elements, catalogSearchQuery, { column, order }) => {
    let result = [...(elements || [])]

    if (catalogSearchQuery) {
      result = result.filter(item =>
        JSON.stringify(Object.values(item))
          .toLowerCase()
          .includes(catalogSearchQuery.toLowerCase()),
      )
    }

    const sortedColumn = (attributes || []).find(attr => attr.nick === column)

    if (sortedColumn) {
      result.sort((a, b) => {
        const first = a.values.find(val => val.nick === column) || {}
        const second = b.values.find(val => val.nick === column) || {}
        return SORTERS[sortedColumn.type](first.value, second.value)
      })
      result = order === 'desc' ? [...result] : [...result.reverse()]
    } else {
      result.sort((a, b) => Date.parse(b.dateCreate) - Date.parse(a.dateCreate))
    }

    return result
  },
)

const showElementsModalSelector = createSelector(
  stateSelector,
  state => state.showElementsModal,
)
const currentElementSelector = createSelector(
  stateSelector,
  state => state.currentElement,
)

const selectors = {
  loading: loadingSelector,
  loadingElements: loadingElementsSelector,
  searchQuery: searchQuerySelector,
  availableCatalogs: availableCatalogsSelector,
  filteredCatalogs: filteredCatalogsSelector,
  groupedCatalogs: groupedCatalogsSelector,
  currentCatalog: currentCatalogSelector,
  catalogsSideWidth: catalogsSideWidthSelector,
  catalogSearchQuery: catalogSearchQuerySelector,
  sort: sortSelector,
  tableData: tableDataSelector,
  currentDictNick: currentDictNickSelector,
  tableAttributes: tableAttributesSelector,
  currentElement: currentElementSelector,
  showElementsModal: showElementsModalSelector,
  byNick: byNickSelector,
}

const reportsaga = function*({ payload }) {
  global.location = `${nsiService.api}/reports/excel/nickDict/${payload.nick}`
}

const loadCurrendDictSaga = function*() {
  const nick = yield select(currentDictNickSelector)

  if (nick) {
    yield put(nsiNew.actions.loadElements(nick))
  }
}

const rootSaga = function*() {
  // yield put(nsiService.actions.loadAllDicts())
  yield put(nsiNew.actions.loadAllDicts())
  yield all([
    takeEvery(types.SET_CURRENT_DICT, loadCurrendDictSaga),
    takeEvery(nsiNew.types.MAKE_REPORT, reportsaga),
    takeEvery(success(nsiNew.types.SAVE_DICT), loadCurrendDictSaga),
  ])
}

export { name, baseRoute, selectors, types, reducers, actions }

export default {
  id: name,
  reducerMap: {
    [nsiService.name]: nsiService.default,
    [nsiNew.name]: nsiNew.default,
    [name]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [rootSaga],
}
