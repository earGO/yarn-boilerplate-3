import React from 'react';
import { Input, Toggle, Datepicker } from '@ursip/design-system'
import RefLinkInput from './RefLinkInput'

const placeholderValues = {
  string: '',
  date: undefined,
  number: 0,
  boolean: false,
  ref_link: null,
}

// Запихнем id ряда, id колонки в хендлер, поменяем данные в контейнере.
export const EditableCell = ({ attribute, rowData, rowFromState, handleEditableRowChange }) => {
  const curriedHandler = handleEditableRowChange(rowData.key, attribute.key)
  const common = {
    value: rowFromState[attribute.key] || placeholderValues[attribute.type],
    onChange: curriedHandler,
  }
  if (typeof attribute.type === 'object') {
    return <RefLinkInput {...common} rowData={rowData} attribute={attribute} />
  }
  switch (attribute.type) {
    case 'string':
      return <Input {...common} />
    case 'date':
      return <Datepicker {...common} appendToBody />
    case 'number':
      return <Input {...common} type="number" />
    case 'boolean':
      return <Toggle { ...common} />
    default:
      return <Input />
  }
}