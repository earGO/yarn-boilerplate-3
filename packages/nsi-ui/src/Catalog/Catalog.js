import React from 'react'
import { compose, combineReducers } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { injectReducer } from '@ursip/utils'
import nsi from '@ursip/nsi-service'
import { Text, Heading, Box, Flex, Table, Input, Icon, Button } from '@ursip/design-system'
import { arrayToTree } from '../utils' 

class Catalog extends React.Component {
  state = {
    loading: false,
    selected: null,
  }

  componentDidMount() {
    this.props.getAllByCatalogId({
      payload: {
        catalogId: this.props.catalogId,
      },
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.catalogId !== this.props.catalogId) {
      this.props.getAllByCatalogId({
        payload: {
          catalogId: this.props.catalogId,
        },
      })
    }
  }

  getTableColumns = () => {
    // console.log('Catalog, rows', this.props.selectedCatalog, this.props.catalogRows )
    const { attributes } = this.props.selectedCatalog
    return (attributes || []).map(attribute => {
      return (
        <Table.Column key={attribute.key} flexGrow={1} minWidth={160}>
          <Table.HeaderCell>{attribute.title}</Table.HeaderCell>
          <Table.Cell dataKey={attribute.key} />
        </Table.Column>
      )
    })
  }

  render() {
    return (
      <Box>
        <Flex height={24} alignItems="center">
          <Box width="48px">
            <Text fontSize={1}>Группа:</Text>
          </Box>
          <Text fontSize={1} ml={4}>
            idk тут нет поле группа
          </Text>
        </Flex>
        <Flex height={24} alignItems="center">
          <Box width="48px">
            <Text fontSize={1}>Описание:</Text>
          </Box>
          <Text fontSize={1} ml={4}>
            {this.props.selectedCatalog.description}
          </Text>
        </Flex>
        <Box className="tableWrap" border="1px solid #ecebeb" mt={32}>
          <Flex className="controls" justifyContent="space-between" mt={16}>
            <Box ml={3} width="336px">
              <Input size="small" placeholder="Поиск" prefix={<Icon name="question-circle" />} />
            </Box>
            <Flex>
              <Box width="160px">
                <Button type="secondary" size="small">
                  <Icon mr={2} name="plus-circle" />
                  Добавить строку
                </Button>
              </Box>
              <Box width="192px">
                <Button type="flat" size="small">
                  <Icon mr={2} name="chevron-down" />
                  Расширенный поиск
                </Button>
              </Box>
              <Flex width="16px" alignItems="center">
                <Icon mr={2} name="ellipsis-v" />
              </Flex>
            </Flex>
          </Flex>
          <Box mt={16}>
            <Table data={this.props.catalogRows} width={832} isTree height={376} >
              {this.getTableColumns()}
              <Table.Column fixed="right">
                <Table.HeaderCell style={{ paddingLeft: '16px' }}>Действия</Table.HeaderCell>
                <Table.Cell><Icon name="ellipsis-h" /></Table.Cell>
              </Table.Column>
            </Table>
          </Box>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const catalogRows = state[nsi.name].rows[id] || []
  const treeRows = arrayToTree(catalogRows)
  return {
    catalogId: id,
    ...ownProps,
    catalogs: nsi.selectors.catalogs(state),
    selectedCatalog: nsi.reselectors.catalogs.getCatalogById(state, id),
    catalogRows: treeRows.rootItems,
  }
}

const enhance = compose(
  injectReducer({
    key: nsi.name,
    reducer: combineReducers(nsi.reducers),
  }),
  connect(
    mapStateToProps,
    { ...nsi.actions.catalogs, ...nsi.actions.rows },
  ),
  withRouter,
)

export default enhance(Catalog)
