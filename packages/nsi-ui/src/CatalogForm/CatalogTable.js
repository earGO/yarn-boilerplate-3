import React from 'react'
import { Table, Select, Input, Toggle, Icon, Box, Flex, Tooltip } from '@ursip/design-system'
import styled from 'styled-components'
import propTypes from 'prop-types'

const typeOptions = [
  { label: 'Строка', value: 'string' },
  { label: 'Дата', value: 'date' },
  { label: 'Целое число', value: 'number' },
  { label: 'Логическое', value: 'boolean' },
  { label: 'Другой справочник', value: 'ref_link' },
]

const CenteredHeaderCell = styled(Table.HeaderCell)`
  padding-left: 16px;
  justify-content: center;
`

const CenteredTableCell = styled(Table.Cell)`
  padding-left: 16px;
  justify-content: center;
`

const getCatalogsOptions = catalogs => {
  return catalogs.map(item => ({
    label: item.name,
    value: item.id,
  }))
}

const getAttributeOptions = (catalogs, catalogId) => {
  const catalog = catalogs.find(item => item.id === catalogId)
  return catalog.attributes.map(item => ({
    label: item.title,
    value: item.key,
  }))
}

const handleRowHeight = rowData => {
  const isObject = rowData.type instanceof Object
  if (isObject && rowData.type.catalogId) {
    return 72 + 48 + 48
  }
  if (isObject) {
    return 72 + 48
  }
  return 72
}

const RefCatalogSelect = ({ refCatalogs, rowData, handleChange }) => {
  const options = getCatalogsOptions(refCatalogs)
  return (
    <Box mt={2}>
      <Select
        options={options}
        value={options.find(item => item.value === rowData.type.catalogId)}
        menuPortalTarget={document.getElementById('nsiwrap')}
        onChange={handleChange}
      />
    </Box>
  )
}

const RefCatalogAttributeSelect = ({ refCatalogs, catalogId, rowData, handleChange }) => {
  const options = getAttributeOptions(refCatalogs, catalogId)
  return (
    <Box key={catalogId} mt={2}>
      <Select
        options={options}
        value={options.find(item => item.value === rowData.type.attributeId)}
        menuPortalTarget={document.getElementById('nsiwrap')}
        onChange={handleChange}
      />
    </Box>
  )
}

const CatalogTable = ({ handleItemChange, handleItemDelete, handleTypeChange, attributes, refCatalogs }) => {
  return (
    <Table
      width={990}
      setRowHeight={handleRowHeight}
      data={attributes}
      minHeight={72 + 48}
      rowHeight={72}
      autoHeight
      rowKey="key"
    >
      <Table.Column width={160}>
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

      <Table.Column width={160}>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Тип</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px' }} dataKey="type" flexGrow={1}>
          {rowData => {
            return (
              <Box flex="1">
                <Select
                  options={typeOptions}
                  value={typeOptions.find(
                    item => item.value === (typeof rowData.type === 'string' ? rowData.type : rowData.type.type),
                  )}
                  menuPortalTarget={document.getElementById('nsiwrap')}
                  onChange={handleTypeChange(rowData.key, 'type')}
                />
                {rowData.type.type === 'ref_link' && (
                  <RefCatalogSelect
                    rowData={rowData}
                    refCatalogs={refCatalogs}
                    handleChange={handleTypeChange(rowData.key, 'catalogId')}
                  />
                )}
                {rowData.type.type === 'ref_link' && rowData.type.catalogId && (
                  <RefCatalogAttributeSelect
                    rowData={rowData}
                    refCatalogs={refCatalogs}
                    catalogId={rowData.type.catalogId}
                    handleChange={handleTypeChange(rowData.key, 'attributeId')}
                  />
                )}
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
            return (
              <Flex justifyContent="center">
                <Toggle checked={rowData.unique} onChange={handleItemChange('unique', rowData.key)} />
              </Flex>
            )
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
  refCatalogs: propTypes.array,
  handleItemChange: propTypes.func,
  handleItemDelete: propTypes.func,
  handleTypeChange: propTypes.func,
}

export default CatalogTable
