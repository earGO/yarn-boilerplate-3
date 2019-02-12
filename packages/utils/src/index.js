// export { default as configureStore } from './configureStore'
// export { default as injectReducer } from './utils/injectReducer'
// export { default as injectSaga } from './utils/injectSaga'
// // eslint-disable-next-line import/named
// export { default as injectConstants } from './utils/constants'

import configureStore from './configureStore'
import injectReducer from './utils/injectReducer'
import injectSaga from './utils/injectSaga'
// eslint-disable-next-line import/named
import injectConstants from './utils/constants'

export default {
  configureStore,
  injectReducer,
  injectSaga,
  injectConstants,
}
