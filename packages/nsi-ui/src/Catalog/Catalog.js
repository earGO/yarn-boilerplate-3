import React from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import produce from 'immer'
import moment from 'moment'
import nsi from '@ursip/nsi-service'
import { Text, Box, Flex, Table, Input, Icon, Button, Popover, Divider } from '@ursip/design-system'
import { EditableCell } from './EditableCell'
import { arrayToTree, simpleInject, SORTERS } from '../utils'
// Использовалось в старом НСИ.
import uuid from 'uuid/v4'

const DEFAULT_SORT = {
  order: 'desc',
  columnKey: null,
}

const DEFAULT_VALUES = {
  string: '',
  date: '',
  number: '',
  boolean: 'false',
  ref_link: '',
}

const CenteredHeaderCell = styled(Table.HeaderCell)`
  padding-left: 16px;
  justify-content: center;
`

const SortableHeaderCell = styled(Table.HeaderCell)`
  .rs-table-cell-content {
    border-right: 1px solid #ecebeb;
  }
`

const CenteredTableCell = styled(Table.Cell)`
  padding-left: 16px;
  justify-content: center;
`
// remove isCurrentlyActive from DOM element
const SortIcon = styled(({ isCurrentlyActive, ...rest }) => <Icon {...rest} />)`
  cursor: pointer;
  opacity: 0.7;
  transform: scale(0.7);
  color: ${props => (props.isCurrentlyActive ? '#0091ea' : 'black')};
`

const DropdownTrigger = styled(Icon)`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`
const DropdownMenuItem = styled(Box)`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`

const ColumnWithSorter = ({ attribute, handleSortChange, activeSort, ...rest }) => {
  const isCurrentlyActive = order => activeSort.columnKey === attribute.key && order === activeSort.order
  return (
    <SortableHeaderCell {...rest}>
      {attribute.title}
      <Flex ml={1} flexDirection="column">
        <SortIcon
          isCurrentlyActive={isCurrentlyActive('asc')}
          name="arrow-up"
          onClick={() => {
            handleSortChange('asc', attribute.key)
          }}
        />
        <SortIcon
          isCurrentlyActive={isCurrentlyActive('desc')}
          name="arrow-down"
          onClick={() => {
            handleSortChange('desc', attribute.key)
          }}
        />
      </Flex>
    </SortableHeaderCell>
  )
}

class Catalog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      activeSort: DEFAULT_SORT,
      expandedRowKeys: [],
      editableRowId: null,
      editableRowData: {},
    }
  }

  /** Так как в Table стремные дефолтные иконки expand-collapse ряда в таблице, придется делать
   * ее controlled и пихать свои иконки.
   */
  handleExpandedRowsChange = (expanded, rowData) => {
    this.setState({
      expandedRowKeys: expanded
        ? [...this.state.expandedRowKeys, rowData.key]
        : this.state.expandedRowKeys.filter(key => key !== rowData.key),
    })
  }

  componentDidMount() {
    this.props.getAllByCatalogId({
      payload: {
        catalogId: this.props.catalogId,
      },
    })
  }

  // Скинем сортировки в таблице на дефолтные при выборе другого каталога.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.catalogId !== this.props.catalogId) {
      this.setState(
        {
          activeSort: DEFAULT_SORT,
        },
        () => {
          this.props.getAllByCatalogId({
            payload: {
              catalogId: this.props.catalogId,
            },
          })
        },
      )
    }
  }

  /** Заполняем колонки таблицы для открытого каталога.
   * Порядок - по полю number.
   * #TBD: Можно ли сделать нормальную динамическую ширину?
   */
  getTableColumns = () => {
    const { attributes = [], type: isHierarchical } = this.props.selectedCatalog
    if (attributes.length && attributes.length > 0) {
      attributes.sort((a, b) => a.number - b.number)
    }
    // #TODO: remove "removed" check;
    return attributes.filter(item => !item.removed).map((attribute, idx) => {
      // Magic numbers
      // #TODO: remove this stupid check
      let minWidth = 200
      return (
        <Table.Column key={attribute.key} width={minWidth} resizable>
          <ColumnWithSorter
            attribute={attribute}
            handleSortChange={this.handleSortChange}
            activeSort={this.state.activeSort}
          />
          <Table.Cell>
            {rowData => {
              return rowData.key === this.state.editableRowId ? (
                <EditableCell
                  // #Пиздос. Для первой колонки, иерархического справочника, и если есть иконка раскрыть-скрыть.
                  fixColumnAlign={isHierarchical && idx === 0 && rowData.children }
                  // #Пиздос end
                  attribute={attribute}
                  rowData={rowData}
                  handleEditableRowChange={this.handleEditableRowChange}
                  rowFromState={this.state.editableRowData[rowData.key]}
                />
              ) : (
                <Box style={{ wordBreak: 'break-word', display: 'inline-block' }}>
                  {this.getFormattedValue(rowData[attribute.key], attribute.type)}
                </Box>
              )
            }}
          </Table.Cell>
        </Table.Column>
      )
    })
  }

  getDefaultValues = (catalog) => {
    const { attributes = [] } = catalog
    return attributes.reduce((acc, attribute) => ({
      ...acc,
      [attribute.key]: DEFAULT_VALUES[attribute.type],
    }), {})
  }

  handleSearch = query => {
    this.setState({
      searchQuery: query,
    })
  }

  handleSortChange = (order, columnKey) => {
    this.setState({
      activeSort: {
        order,
        columnKey,
      },
    })
  }

  handleRowHeight = rowData => {
    return this.state.editableRowId === rowData.key ? 72 : 48
  }

  // Отображение значений в ячейке таблице. Пока только покажем дату.
  // #TODO
  // Потом вместо id в (attributeType === 'ref_link') показывать реальное значение?
  getFormattedValue = (value, attributeType) => {
    if (attributeType === 'date') {
      return value ? moment(+value).format('DD.MM.YYYY') : null
    }
    if (attributeType === 'boolean') {
      switch (value) {
        case 'true':
          return 'да'
        case 'false':
          return 'нет'
        default:
          return 'undefined'
      }
    }
    return value
  }

  /**
   * Добавление ряда в табличку.
   * Ответ добавит новый row в пропсы автоматом. Откроем его сразу на редактирование.
   */
  handleAddRow = () => {
    const { selectedCatalog } = this.props
    const newKey = uuid()
    const defaultValues = this.getDefaultValues(selectedCatalog)
    const payload = {
      payload: {
        newRow: {
          ...defaultValues,
          catalogId: this.props.catalogId,
          key: newKey,
        },
        catalogId: this.props.catalogId,
      },
    }
    this.props.createRow(payload).then(response => {
      this.setState(prevState => ({
        editableRowId: newKey,
        editableRowData: {
          ...prevState.editableRowData,
          [newKey]: response.payload.data,
        }
      }))
    })
  }

  // Отдельный хендлер добавления ряда для иерархического справочника.
  handleRowAddAsChild = rowData => {
    const { selectedCatalog } = this.props
    const newKey = uuid()
    const defaultValues = this.getDefaultValues(selectedCatalog)
    const newRow = {
      ...defaultValues,
      catalogId: this.props.catalogId,
      key: newKey,
      removed: false,
      parentId: rowData.key,
    }
    const payload = {
      payload: {
        newRow,
        catalogId: this.props.catalogId,
      },
      meta: { asPromise: true },
    }
    console.log('Adding a row as a child to', rowData, 'sending this data:', payload)
    this.props.createRow(payload).then(() => {
      this.setState(prevState => ({
        editableRowId: newKey,
        expandedRowKeys: [ ...new Set(prevState.expandedRowKeys.concat(rowData.key)) ],
        editableRowData: {
          ...prevState.editableRowData,
          [newKey]: newRow,
        }
      }))
    })
  }

  /**
   * Пока нет валидации, подчистим null поля перед сохранением, иначе 400 в лицо)
   */
  handleRowSave = key => {
    const updatedRowData = this.state.editableRowData[key]
    let withoutNullFields = {}
    for (let key of Object.keys(updatedRowData)) {
      if (updatedRowData[key] !== null) {
        withoutNullFields = { ...withoutNullFields, [key]: updatedRowData[key] }
      }
    }
    const payload = {
      payload: {
        updatedRow: withoutNullFields,
        catalogId: this.props.catalogId,
      },
      meta: {
        asPromise: true,
      },
    }
    console.log('Trying to update the row on backend', payload)
    this.props.updateRow(payload).then(() => this.setState({ editableRowId: null }))
  }

  handleCancelRow = () => this.setState({ editableRowId: null })

  // Делает ряд редактируемым.
  handleEditRow = rowData => {
    // Уберем служебные поля children/ _parent
    const { children, _parent, ...rest } = rowData
    this.setState(prevState => ({
      ...prevState,
      editableRowId: rowData.key,
      editableRowData: {
        ...prevState.editableRowData,
        [rowData.key]: rest,
      }
    }))
  }

  handleRowDelete = rowData => {
    const deletedRow = { ...rowData, removed: true }
    // Уберем служебные поля children/ _parent
    const { children, _parent, ...rest } = deletedRow
    const payload = {
      payload: {
        deletedRow: rest,
        catalogId: this.props.catalogId,
      },
    }
    if (confirm('Удалить строку?')) {
      this.props.deleteRow(payload)
    }
  }

  // Общий хендлер для все полей ряда на редактировании.
  // Отдельно перегоняем дату из momentObject в unixtimestamp.
  // И отдельно перегоняет boolean значение в строки, т.к они хранятся как строки.
  handleEditableRowChange = (rowKey, attributeKey, type) => value => {
    const producer = produce(draft => {
      switch (type) {
        case 'date':
          draft.editableRowData[rowKey][attributeKey] = value.format('x')
          break
        case 'boolean':
          draft.editableRowData[rowKey][attributeKey] = String(value)
          break
        default:
          draft.editableRowData[rowKey][attributeKey] = value
      }
    })
    this.setState(producer)
  }

  /**
   * Контролсы для последней колонки в таблице.
   */
  getTooltip = rowData => {
    const { selectedCatalog } = this.props
    const isHierarchical = selectedCatalog.type
    const content = (
      <Flex flexDirection="column" width={120}>
        {rowData.key === this.state.editableRowId ? (
          <DropdownMenuItem onClick={() => this.handleRowSave(rowData.key)} pl={3} py={2}>
            <Text align="left">Сохранить</Text>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => this.handleEditRow(rowData)} pl={3} py={2}>
            <Text align="left">Редактировать</Text>
          </DropdownMenuItem>
        )}
        {isHierarchical && (
          <React.Fragment>
            <Divider my={0} />
            <DropdownMenuItem onClick={() => this.handleRowAddAsChild(rowData)} pl={3} py={2}>
              <Text align="left">Добавить</Text>
            </DropdownMenuItem>
          </React.Fragment>
        )}
        <Divider my={0} />
        <DropdownMenuItem onClick={() => this.handleRowDelete(rowData)} pl={3} py={2}>
          <Text align="left">Удалить</Text>
        </DropdownMenuItem>

        <Divider my={0} />

        {rowData.key === this.state.editableRowId && (
          <DropdownMenuItem onClick={this.handleCancelRow} pl={3} py={2}>
            <Text align="left">Отмена</Text>
          </DropdownMenuItem>
        )}
      </Flex>
    )
    return (
      <Popover placement="bottom" events={['click']} content={content} transitionName={null}>
        <DropdownTrigger name="ellipsis-h" />
      </Popover>
    )
  }

  getFilteredCatalogRows = sortedRows => {
    const { searchQuery } = this.state
    // Если есть query поиска.
    if (searchQuery) {
      const filteredRaw = sortedRows.filter(item => {
        const { key, catalogId, ...rest } = item
        const values = Object.values(rest)
        return JSON.stringify(values).includes(searchQuery)
      })
      return filteredRaw
      // И как работать с деревом тут?))
      // + нужно добавить ноды, чтобы дерево таки построилось.
      const grouped = arrayToTree(filteredRaw)
      return grouped.rootItems
    }
    return sortedRows
  }

  getPresortedData = rawRows => {
    const { attributes: catalogAttributes } = this.props.selectedCatalog
    const { columnKey, order } = this.state.activeSort
    let result = []
    // Если есть активная сортировка.
    if (columnKey) {
      const sortedColumn = catalogAttributes.find(item => item.key === columnKey)
      // Косяк, что при переключении каталогов не сразу сбрасывается сортировка.
      // #TODO: разобраться с key для враппера этого каталога, понять, почему не ремаунтится компонент.
      if (!sortedColumn) {
        return rawRows
      }
      const sortFunction = (a, b) => SORTERS[sortedColumn.type](a[columnKey], b[columnKey])
      rawRows.sort(sortFunction)
      // idk, без спреда не работает))))
      result = order === 'desc' ? [...rawRows] : [...rawRows.reverse()]
    } else {
      result = [...rawRows]
    }
    return result
  }

  getTableDataSource = catalogRows => {
    // Итак.
    // 1) Сортируем данные
    // 2) Фильтруем, если запущен поиск
    // 3) Собираем дерево.
    // 4) ???
    // 5) Profit.
    const handleDataSource = compose(
      arrayToTree,
      this.getFilteredCatalogRows,
      this.getPresortedData,
    )
    const { rootItems } = handleDataSource(catalogRows)
    return rootItems
  }

  render() {
    const currentScale = screen.width / window.innerWidth;
    const mp = Math.floor(1 / currentScale)
    return (
      <Box id="catalogWrapper">
        <Text>
          Код справочника:{' '}
          <Text inline bold>
            {this.props.selectedCatalog.code || <i>&mdash;</i>}
          </Text>
        </Text>
        <Text>
          Описание:{' '}
          <Text inline bold>
            {this.props.selectedCatalog.description || <i>&mdash;</i>}
          </Text>
        </Text>
        <Box className="tableWrap" style={{ border: '1px solid #ecebeb' }} mt={32}>
          <Flex className="controls" justifyContent="space-between" alignItems="center" mt={16}>
            <Box ml={3} width="336px">
              <Input
                size="small"
                placeholder="Поиск"
                prefix={<Icon fontSize="12px" name="search" />}
                onChange={this.handleSearch}
              />
            </Box>
            <Box width="144px" mr={3}>
              <Button type="secondary" block size="small" onClick={this.handleAddRow}>
                <Icon mr={2} name="plus" />
                Добавить строку
              </Button>
            </Box>
          </Flex>
          <Box mt={16} borderTop="1px solid #ecebeb">
            <Table
              renderTreeToggle={(icon, rowData) => {
                // Не показывает иконку для ряда на редактировании.
                if (rowData.key === this.state.editableRowId) {
                  return null
                }
                return this.state.expandedRowKeys.includes(rowData.key) ? (
                  <Icon style={{ outline: 'none' }} name="chevron-up" onClick={icon.props.onClick} />
                ) : (
                  <Icon style={{ outline: 'none' }} name="chevron-down" onClick={icon.props.onClick} />
                )
              }}
              expandedRowKeys={this.state.expandedRowKeys}
              onExpandChange={this.handleExpandedRowsChange}
              data={this.getTableDataSource(this.props.rawRows)}
              isTree
              wordWrap
              height={550 * mp}
              autoHeight
            >
              {this.getTableColumns()}
              <Table.Column fixed="right" width={96}>
                <CenteredHeaderCell>Действия</CenteredHeaderCell>
                <CenteredTableCell>{this.getTooltip}</CenteredTableCell>
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
    rawRows: catalogRows,
  }
}

const enhance = compose(
  simpleInject(nsi),
  connect(
    mapStateToProps,
    { ...nsi.actions.catalogs, ...nsi.actions.rows },
  ),
  withRouter,
)

export default enhance(Catalog)
