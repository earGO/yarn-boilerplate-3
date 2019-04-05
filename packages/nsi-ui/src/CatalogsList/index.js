import React from 'react'
import { compose, combineReducers } from 'redux'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { injectReducer } from '@ursip/utils'
import nsi from '@ursip/nsi-service'
import { Text, Collapse, Box, Flex } from '@ursip/design-system'
import * as R from 'ramda'

const Panel = Collapse.Panel

const isActive = ({ id, activeCatalogId, ...rest }) => {
  return (
    id &&
    activeCatalogId &&
    id === activeCatalogId &&
    css`
      background: ${rest.theme.colors.lightGrey};
    `
  )
}

const CollapseItem = styled(Flex)`
  min-height: 32px;
  align-items: center;
  ${props => `border-bottom: 1px solid ${props.theme.colors.border}`}
  ${isActive}
  &:hover {
    opacity: 0.7;
  }
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
    const { getAll, history } = this.props
    getAll({ meta: { asPromise: true } })
      .then(res => res.payload.data[0] && history.push('/nsi/' + res.payload.data[0].id))
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    const { id: activeCatalogId } = this.props.match.params
    /** На самом деле там никаких разделений нет, поле type хз что значит, но можно по нему разбить в 2 группы */
    const byType = R.groupBy(catalog => catalog.group)
    const grouped = byType(this.props.data);
    return (
      <Box width="100%" width={256}>
        <Collapse defaultActiveKeys={['system', 'custom']}>
          {Object.keys(grouped).map(group => (
            <Panel
              key={group}
              title={
                <CollapseItem>
                  <Text bold>{group}</Text>
                </CollapseItem>
              }
            >
            {(grouped[group] || []).map(item => (
              <StyledLink key={item.id} title={item.name} to={`/nsi/${item.id}`}>
                <CollapseItem id={item.id} activeCatalogId={activeCatalogId}>
                  <Text truncated pl={24}>
                    {item.name}
                  </Text>
                </CollapseItem>
              </StyledLink>
            ))}
            </Panel>
          ))}
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
