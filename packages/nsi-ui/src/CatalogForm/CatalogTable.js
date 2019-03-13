import React from 'react'
import { Table, Select, Input, Toggle, Icon, Box, Tooltip } from '@ursip/design-system'
import styled from 'styled-components'
import propTypes from 'prop-types'

const typeOptions = [
  { label: 'Строка', value: 'string' },
  { label: 'Дата', value: 'date'},
  { label: 'Целое число', value: 'number'},
  { label: 'Логическое', value: 'boolean'},
  { label: 'Другой справочник', value: 'ref_link'},
]

const CenteredHeaderCell = styled(Table.HeaderCell)`
  padding-left: 16px;
  justify-content: center;
`

const CenteredTableCell = styled(Table.Cell)`
  padding-left: 16px;
  justify-content: center;
`

const CatalogTable = ({ handleItemChange, handleItemDelete, attributes }) => {
  return (
    <Table data={attributes} minHeight={72 + 48} rowHeight={72} autoHeight rowKey="key">
      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Название</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px' }} dataKey="title">
          {rowData => {
            return (
              <Box flex="1">
                <Input value={rowData.title} onChange={handleItemChange('title', rowData.key)} />
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Тип</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px' }} dataKey="type" flexGrow={1}>
          {rowData => {
            return (
              <Box flex="1">
                <Select
                  options={typeOptions}
                  // temp
                  value={typeOptions.find(item => item.value === rowData.type.value)}
                  // value={rowData.type}
                  menuPortalTarget={document.getElementById('tableWrapper')}
                  onChange={handleItemChange('type', rowData.key)}
                />
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={128} sort>
        <CenteredTableCell>Обязательность</CenteredTableCell>
        <CenteredTableCell dataKey="required">
          {rowData => {
            return <Toggle checked={rowData.required} onChange={handleItemChange('required', rowData.key)} />
          }}
        </CenteredTableCell>
      </Table.Column>

      <Table.Column width={128} sort>
        <CenteredTableCell>Уникальность</CenteredTableCell>
        <CenteredTableCell dataKey="unique">
          {rowData => {
            return <Toggle checked={rowData.unique} onChange={handleItemChange('unique', rowData.key)} />
          }}
        </CenteredTableCell>
      </Table.Column>

      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Описание</Table.HeaderCell>
        <Table.Cell dataKey="description">
          {rowData => {
            return (
              <Box flex="1">
                <Input value={rowData.note} onChange={handleItemChange('note', rowData.key)} />
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={96}>
        <CenteredHeaderCell>Действия</CenteredHeaderCell>
        <CenteredTableCell>
          {rowData => (
            <Icon
              name="ellipsis-h"
              title="Удалить"
              onClick={() => {
                handleItemDelete(rowData.key)
              }}
            />
          )}
        </CenteredTableCell>
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
