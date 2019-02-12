import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { requestsPromiseMiddleware, createRequestInstance, watchRequests } from 'redux-saga-requests'
import { createDriver } from 'redux-saga-requests-fetch'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(args = {}) {
  const history = args.history || createBrowserHistory()
  const middlewares = args.middlewares || []
  const request = args.request || {}
  const reducers = args.reducers || {}

  const initialReducers = {
    router: connectRouter(history),
    ...reducers,
  }

  const middlewaresToApply = [
    sagaMiddleware,
    thunkMiddleware,
    routerMiddleware(history),
    requestsPromiseMiddleware({
      auto: Boolean(request.asPromise),
    }),
    ...middlewares,
  ]

  const enhancers = [applyMiddleware(...middlewaresToApply)]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose
  /* eslint-enable */

  const store = createStore(combineReducers(initialReducers), {}, composeEnhancers(...enhancers))

  // eslint-disable-next-line func-names
  sagaMiddleware.run(function*() {
    yield createRequestInstance({
      driver: createDriver(window.fetch),
    })

    yield fork(watchRequests)
  })

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.injectedReducers = initialReducers // Reducer registry
  store.injectedSagas = {} // Saga registry
  store.history = history // history

  return store
}
