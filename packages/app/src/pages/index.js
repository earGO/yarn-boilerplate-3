import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { name as appName } from '../../package.json'
import Layout from '../components/Layout'
import { Flex, Box, Heading, Text, Divider } from '@ursip/design-system'
import Main from './main'
import { BaseNSITemplate } from '@ursip/nsi-ui'

function NotFound() {
  return (
    <Text pt={2}>
      <Text bold fontSize={50} ml={2}>
        404
      </Text>
      <Divider />
      <Heading>Страница не найдена</Heading>
    </Text>
  )
}

function Pages() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/nsi" component={BaseNSITemplate} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </React.Fragment>
  )
}

export default Pages
