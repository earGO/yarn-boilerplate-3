import React from 'react';
import { Input, Toggle } from '@ursip/design-system'

// Пока нет datepicker, input.number, ref_link.
const ElementsMap = {
  string: Input,
  date: Input,
  number: Input,
  boolean: Toggle,
  ref_link: Input,
}

// Запихнем id ряда, id колонки в хендлер, поменяем данные в контейнере.
export const EditableCell = ({ attribute, rowData, rowFromState, handleEditableRowChange }) => {
  const curriedHandler = handleEditableRowChange(rowData.key, attribute.key)
  const Element = ElementsMap[attribute.type]
  return <Element value={rowFromState[attribute.key]} onChange={curriedHandler} />
}