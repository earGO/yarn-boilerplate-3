import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { name as appName } from '../../package.json'
import Nsi from './nsi'
import Main from './main'

function Pages() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/nsi" component={Nsi} />
      </Switch>
    </React.Fragment>
  )
}

export default Pages
