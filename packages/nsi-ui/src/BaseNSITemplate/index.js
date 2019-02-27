import React from 'react'
import { Box, Flex } from '@ursip/design-system'
import { Route, Switch, withRouter } from 'react-router-dom'
import CatalogsList from '../CatalogsList'
import CatalogForm from '../CatalogForm'
import Catalog from '../Catalog'
import Header from '../Header'

class BaseNSITemplate extends React.Component {
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
              {/* По хорошему тут бы закидывать данные 
                в CatalogForm в зависимости от того, редактирование это или создание.
              */}
              <Route exact path="/nsi/create" component={CatalogForm} />
              <Route exact path="/nsi/:id/edit" component={CatalogForm} />
              <Route path="/nsi/:id" component={Catalog} />
            </Switch>
          </Box>
        </Flex>
      </Flex>
    )
  }
}

/* Возможно, будет лучше такой вариант? */
// const CreateCatalog = () => (
//   <Flex flexDirection="column" width="1440px" mx="auto">
//     <CreateCatalogHeader />
//   <Flex mt={3} mx={160}>
//     <Box flex="0 0 256px">
//       <CatalogsList />
//     </Box>
//     <Box ml="32px" flex="1">
//       <CatalogForm />
//     </Box>
//   </Flex>
// </Flex>
// )
// const mstp = (state) => ({...state})
// const ConnectedCatalog = connect(mstp)(CreateCatalog)
// class __BaseNSITemplate extends React.Component {
//   render() {
//     return (
//       <Switch>
//         <Route exact path="/nsi/create" component={ConnectedCatalog} />
//         <Route exact path="/nsi/:id/edit" component={EditCatalog} />
//         <Route path="/nsi/:id" component={ViewCatalogs} />
//       </Switch>
//     )
//   }
// }

export default withRouter(BaseNSITemplate)
