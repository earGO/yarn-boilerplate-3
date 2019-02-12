import { configureStore } from '@ursip/utils'
import { createLogger } from 'redux-logger'

export default configureStore({
  request: {
    asPromise: true
  },
  middlewares: [
    createLogger({
      collapsed: false
    })
  ]
})
