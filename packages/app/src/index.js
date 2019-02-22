import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from '@ursip/design-system'

import store from './store'
import theme from './theme'

import Pages from './pages'

import './assets/fonts/PTSans/font.css'
import '@ursip/design-system/build/index.es.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={store.history}>
      <ThemeProvider theme={theme}>
        <Pages />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
