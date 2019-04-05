import React from 'react'
import { Input, Toggle, Datepicker, Box } from '@ursip/design-system'
import RefLinkInput from './RefLinkInput'
import moment from 'moment'

const placeholderValues = {
  string: '',
  date: null,
  number: 0,
  boolean: false,
  ref_link: null,
}

// #TODO: fix this shit somewhere else?
// Пока непонятно как там хранить данные будут, поэтому таймштампом пока.
// Ну и вообще интересный кейс тут:
// Поле было формата string - его поменяли на date - как сделать так чтобы эта херня тут не падала?)
const getDatepickerValue = value => {
  if (value === null) {
    return null
  }
  if (value === '') {
    return null
  }
  let buffer = moment(+value)
  return buffer.isValid() ? buffer : null
}

const getToggleValue = value => {
  if (value === null) {
    return false
  }
  return value === 'true'
}

// Враппер нужен, потому что у первой колонки ряда в иерархическом справочнике
// при включении редактирования ряда едет положение элемента из-за невидимого span. Такое дерьмо, да.
export const EditableCell = ({ fixColumnAlign, ...rest }) => (
  <Box style={{ marginTop: fixColumnAlign ? -20 : 0 }}>
    <EditableCellContent {...rest} />
  </Box>
)

// Запихнем id ряда, id колонки в хендлер, поменяем данные в контейнере.
export const EditableCellContent = ({ attribute, rowData, rowFromState, handleEditableRowChange }) => {
  const curriedHandler = handleEditableRowChange(rowData.key, attribute.key, attribute.type)
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
      return (
        <Datepicker
          appendToBody
          id={attribute.key}
          value={getDatepickerValue(common.value)}
          onChange={curriedHandler}
          placeholder="Выберите дату"
          // openDirection="up"
        />
      )
    case 'number':
      return <Input {...common} type="number" />
    case 'boolean':
      return <Toggle checked={getToggleValue(common.value)} onChange={curriedHandler} />
    default:
      return <Input />
  }
}
