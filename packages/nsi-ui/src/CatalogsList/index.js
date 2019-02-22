import React from 'react'
import { compose, combineReducers } from 'redux'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Link, withRouter } from 'react-router-dom'
import { injectReducer } from '@ursip/utils'
import nsi from '@ursip/nsi-service'
import { Text, Heading, Collapse, Box, Flex } from '@ursip/design-system'

const Panel = Collapse.Panel

const isActive = ({ id, activeCatalogId, ...rest}) => {
  return id && activeCatalogId && id === activeCatalogId && css`
    background: ${rest.theme.colors.lightGrey};
  `
}

const CollapseItem = styled(Flex)`
  height: 32px;
  align-items: center;
  ${props => `border-bottom: 1px solid ${props.theme.colors.border}` }
  ${isActive}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
`

class CatalogsList extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.props.getAll({ meta: { asPromise: true } }).finally(() => this.setState({ isLoading: false }))
  }

  render() {
    const { id: activeCatalogId } = this.props.match.params
    if (this.state.isLoading) {
      return <Text>Loading...</Text>
    }
    const customCatalogs = this.props.data.filter(catalog => catalog.type)
    const systemCatalogs = this.props.data.filter(catalog => !catalog.type)
    // debugger;
    return (
      <Box width="100%">
        <Collapse defaultActiveKeys={['system', 'custom']}>
          <Panel
            key="system"
            ml={24}
            title={
              <CollapseItem>
                <Text bold fontSize={1}>
                  Системные
                </Text>
              </CollapseItem>
            }
          >
            {systemCatalogs.map(item => (
              <CollapseItem key={item.id} id={item.id} activeCatalogId={activeCatalogId}>
                <Text fontSize={1}>
                  <StyledLink to={`/nsi/${item.id}`}>{item.name}</StyledLink>
                </Text>
              </CollapseItem>
            ))}
          </Panel>
          <Panel
            key="custom"
            ml={24}
            title={
              <CollapseItem>
                <Text bold fontSize={1}>
                  Пользовательские
                </Text>
              </CollapseItem>
            }
          >
            {customCatalogs.map(item => (
              <CollapseItem key={item.id} id={item.id} activeCatalogId={activeCatalogId}>
                <Text fontSize={1}>
                  <StyledLink to={`/nsi/${item.id}`}>{item.name}</StyledLink>
                </Text>
              </CollapseItem>
            ))}
          </Panel>
        </Collapse>
      </Box>
    )
  }
}

const enhance = compose(
  injectReducer({
    key: nsi.name,
    reducer: combineReducers(nsi.reducers),
  }),
  connect(
    state => ({
      data: nsi.selectors.catalogs(state),
    }),
    nsi.actions.catalogs,
  ),
  withRouter,
)

export default enhance(CatalogsList)
