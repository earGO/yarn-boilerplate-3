import React from 'react'
import { Table, Select, Input, Toggle, Icon, Box, Tooltip } from '@ursip/design-system'
import propTypes from 'prop-types'

const typeOptions = [
  { label: 'Строка', value: 'string' },
  { label: 'Дата', value: 'date'},
  { label: 'Целое число', value: 'number'},
  { label: 'Логическое', value: 'boolean'},
  { label: 'Другой справочник', value: 'ref_link'},
]

const CatalogTable = ({ handleItemChange, handleItemDelete, attributes }) => {
  return (
    <Table data={attributes} minHeight={72 + 48} rowHeight={72} autoHeight rowKey="id">
      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Название</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px' }} dataKey="title">
          {rowData => {
            return <Input value={rowData.title} onChange={handleItemChange('title', rowData.id)} />
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Тип</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px', flex: 1 }} dataKey="type" flexGrow={1}>
          {rowData => {
            return (
              <Box flex="1">
                <Select
                  options={typeOptions}
                  // temp
                  value={typeOptions.find(item => item.value === rowData.type)}
                  // value={rowData.type}
                  menuPortalTarget={document.getElementById('tableWrapper')}
                  onChange={handleItemChange('type', rowData.id)}
                />
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={128} sort>
        <Table.HeaderCell style={{ justifyContent: 'center' }}>Обязательность</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: 16, justifyContent: 'center' }} dataKey="required">
          {rowData => {
            return <Toggle checked={rowData.required} onChange={handleItemChange('required', rowData.id)} />
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={128} sort>
        <Table.HeaderCell style={{ justifyContent: 'center' }}>Уникальность</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: 16, justifyContent: 'center' }} dataKey="unique">
          {rowData => {
            return <Toggle checked={rowData.unique} onChange={handleItemChange('unique', rowData.id)} />
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Описание</Table.HeaderCell>
        <Table.Cell dataKey="description">
          {rowData => {
            return <Input value={rowData.description} onChange={handleItemChange('description', rowData.id)} />
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={96}>
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell>
          {rowData => (
            <Icon
              name="ellipsis-h"
              onClick={() => {
                alert(rowData.id)
              }}
            />
          )}
        </Table.Cell>
        {/* <EditCell
        onEditClick={this.handleOnEditClick}
        handleSave={this.handleSave}
        editRowId={this.state.editRowId}
      /> */}
      </Table.Column>
    </Table>
  )
}

CatalogTable.propTypes = {
  attributes: propTypes.array,
  handleItemChange: propTypes.func,
  handleItemDelete: propTypes.func,
}

export default CatalogTable
