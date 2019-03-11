import React from 'react'
import { compose, combineReducers } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { injectReducer } from '@ursip/utils'
import nsi from '@ursip/nsi-service'
import { Text, Heading, Box, Flex, Table, Input, Icon, Button, Tooltip } from '@ursip/design-system'
import { EditableCell } from './EditableCell'
import { arrayToTree } from '../utils'

class Catalog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      selected: null,
      editableRowId: null,
      editableRowData: {},
    }
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
    const { attributes } = this.props.selectedCatalog
    return (attributes || []).map(attribute => {
      // Magic numbers
      const minWidth = attribute.title.length < 21 ? 160 : attribute.title.length * 10
      return (
        <Table.Column key={attribute.key} flexGrow={1} minWidth={minWidth}>
          <Table.HeaderCell>{attribute.title}</Table.HeaderCell>
          <Table.Cell>
            {rowData => {
              return rowData.key === this.state.editableRowId ? (
                <EditableCell
                  attribute={attribute}
                  rowData={rowData}
                  handleEditableRowChange={this.handleEditableRowChange}
                  rowFromState={this.state.editableRowData[rowData.key]}
                />
              ) : (
                <div style={{ wordBreak: 'break-word ' }}>{rowData[attribute.key]}</div>
              )
            }}
          </Table.Cell>
        </Table.Column>
      )
    })
  }

  onRowAdd = addedRow => {
    this.setState({
      editableRowId: addedRow.id,
    })
  }

  handleAddRow = () => {
    console.log('Trying to add the row', this.props);
    /* this.props.createRow({
      catalogId: this.props.catalogId
    }) 
    */
    // Ответ добавит новый row в пропсы автоматом.
  }

  handleEditRow = (rowData) => {
    console.log('Trying to edit the row');
    this.setState({
      ...this.state,
      editableRowId: rowData.key,
      editableRowData: {
        ...this.state.editableRowData,
        [rowData.key]: rowData,
      }
    })
  }

  handleEditableRowChange = (rowKey, attributeKey) => value => {
    this.setState({
      ...this.state,
      editableRowData: {
        ...this.state.editableRowData,
        [rowKey]: {
          ...this.state.editableRowData[rowKey],
          [attributeKey]: value,
        },
      },
    })
  }

  render() {
    return (
      <Box>
        <Flex height={24} alignItems="center">
          <Box flex="0 0 48px">
            <Text fontSize={1}>Группа:</Text>
          </Box>
          <Text fontSize={1} ml={4}>
            idk тут нет поле группа
          </Text>
        </Flex>
        <Flex height={24} alignItems="center">
          <Box flex="0 0 48px">
            <Text fontSize={1}>Описание:</Text>
          </Box>
          <Text fontSize={1} ml={4}>
            {this.props.selectedCatalog.description}
          </Text>
        </Flex>
        <Box className="tableWrap" border="1px solid #ecebeb" mt={32}>
          <Flex className="controls" justifyContent="space-between" alignItems="center" mt={16}>
            <Box ml={3} width="336px">
              <Input size="small" placeholder="Поиск" prefix={<Icon name="question-circle" />} />
            </Box>
            <Flex>
              <Box width="144px">
                <Button type="secondary" size="small" block onClick={this.handleAddRow}>
                  <Icon mr={2} name="plus-circle" />
                  Добавить строку
                </Button>
              </Box>
              <Box width="160px">
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
            <Table data={this.props.catalogRows} width={832} isTree wordWrap height={376}>
              {this.getTableColumns()}
              <Table.Column fixed="right">
                <Table.HeaderCell style={{ paddingLeft: '16px' }}>Действия</Table.HeaderCell>
                <Table.Cell>
                  {rowData => {
                    // Popover пока нет в библиотеке. Тут еще должно быть удаление row.
                    return (
                      <Icon name="ellipsis-h" title="Редактировать" onClick={() => this.handleEditRow(rowData)} />
                    )
                  }}
                </Table.Cell>
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
