import React from 'react'
import { Box, Flex } from '@ursip/design-system'
import { Route, Switch, withRouter } from 'react-router-dom'
import CatalogsList from '../CatalogsList'
import CatalogForm from '../CatalogForm'
import Catalog from '../Catalog'
import Header from '../Header'

class BaseNSITemplate extends React.Component {
  handleFormSubmit = (form) => {
    console.log('Haha, got dis form', form);
  }

  render() {
    return (
      <Flex flexDirection="column" width="1440px" mx="auto">
        <Header handleFormSubmit={this.handleFormSubmit} />
        <Flex mt={3} mx={160}>
          <Box flex="0 0 256px">
            <Route path="/nsi/:id?" component={CatalogsList} />
          </Box>
          <Box ml="32px" flex="1">
            <Switch>
              <Route exact path="/nsi/create" component={() => <CatalogForm handleFormSubmit={this.handleFormSubmit} />} />
              <Route exact path="/nsi/:id/edit" component={() => <CatalogForm handleFormSubmit={this.handleFormSubmit} />} />
              <Route path="/nsi/:id" component={Catalog} />
            </Switch>
          </Box>
        </Flex>
      </Flex>
    )
  }
}

export default withRouter(BaseNSITemplate)
