import { createStore } from 'redux-dynamic-modules'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { requestsPromiseMiddleware, createRequestInstance, watchRequests } from 'redux-saga-requests'
import { createDriver } from 'redux-saga-requests-fetch'
import { createDriver as createMockDriver } from 'redux-saga-requests-mock'
import { getSagaExtension } from 'redux-dynamic-modules-saga'
import { fork } from 'redux-saga/effects'
import { createBrowserHistory } from 'history'
import {mocks} from '@project/services'
import { logger } from 'redux-logger/src'

const history = createBrowserHistory()

const useMocks = false

const requestSaga = function*() {
  yield createRequestInstance({
    driver: useMocks ? createMockDriver(mocks) : createDriver(window.fetch),
  })

  yield fork(watchRequests)
}

const modules = [
  {
    id: 'initial',
    reducerMap: {
      router: connectRouter(history),
    },
    middlewares: [
      logger,
      routerMiddleware(history),
      requestsPromiseMiddleware({
        auto: true,
      }),
    ],
    sagas: [requestSaga],
  },
]

const store = createStore({}, [], [getSagaExtension()], modules)

store.history = history

export default store
