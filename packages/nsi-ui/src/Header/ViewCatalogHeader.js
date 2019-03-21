import React from 'react';
import { compose, combineReducers } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import nsi from '@ursip/nsi-service'
import { injectReducer } from '@ursip/utils'
import { Text, Box, Flex, Button, Icon } from '@ursip/design-system'

const ViewHeader = props => {
  const { history, location, selectedCatalog, match } = props
  const { id } = match.params
  const handleDeleteCatalog = () => {
    const deletedCatalog = { ...selectedCatalog, removed: true }
    const payload = {
      payload: deletedCatalog,
      meta: { asPromise: true },
    }
    props.markDeleted(payload).then(() => {
      history.push('/nsi')
    })
  }
  return (
    <Flex justifyContent="space-between" flex={1} alignItems="center">
      <Text fontSize={3}>Cправочник</Text>
      <Box className="buttonsWrapper">
        <Button
          type="flat"
          onClick={() => {
            history.push(`${location.pathname}/edit`)
          }}
        >
          <Icon mr={3} name="edit" />
          Редактировать
        </Button>
        <Button disabled={!id} onClick={handleDeleteCatalog} type="flat" ml={3} >
          <Icon mr={3} name="save" />
          Удалить каталог
        </Button>
      </Box>
    </Flex>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  return {
    ...ownProps,
    selectedCatalog: nsi.reselectors.catalogs.getCatalogById(state, id),
  }
}

const enhance = compose(
  injectReducer({
    key: nsi.name,
    reducer: combineReducers(nsi.reducers),
  }),
  connect(mapStateToProps, { ...nsi.actions.catalogs }),
  withRouter,
)

export default enhance(ViewHeader)