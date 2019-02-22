import React from 'react'
import { Table, Select, Input, Form, Toggle, Icon, Divider, Box, Button, Flex } from '@ursip/design-system'

const createForm = Form.createForm

// attributes: [{key: "2a0d678e-464d-4b7b-aea6-eb37f5855feb"}]
// description: "Описания нужны."
// group: "Группаааа"
// name: "Тестовый каталог"
// type: false

const EditableCell = props => {
  const { rowData, dataKey, editRowId, handleCellChange, updatedItem } = props
  return (
    <Table.Cell {...props}>
      {editRowId === rowData.id ? (
        <Input size="small" value={updatedItem[dataKey]} onChange={handleCellChange} />
      ) : (
        rowData[dataKey]
      )}
    </Table.Cell>
  )
}

const EditCell = props => {
  const { onEditClick, handleSave, rowData, editRowId } = props
  return (
    <Table.Cell {...props}>
      {editRowId === rowData.id ? (
        <Icon name="save" onClick={() => handleSave(rowData.id)} />
      ) : (
        <Icon name="edit" onClick={() => onEditClick(rowData.id)} />
      )}
    </Table.Cell>
  )
}

class CatalogForm extends React.Component {
  state = {
    attributes: [
      {
        key: 1,
        name: 'HelloTest',
        type: '123123',
      },
    ],
    uuid: 2,
  }

  handleAddRow = () => {
    this.setState(prevState => ({
      attributes: prevState.attributes.concat({ key: prevState.uuid, name: `${prevState.uuid} + Name` }),
      uuid: prevState.uuid + 1,
    }))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Box>
        <Flex className="fieldWrapper">
          <Flex width="64px" fontSize={1} alignItems="center">
            Название:
          </Flex>
          <Flex ml={2} width="100%">
            {getFieldDecorator('name', {
              rules: [{ message: 'Заполните поле name' }],
            })(<Input placeholder="Введите название" />)}
          </Flex>
        </Flex>

        <Flex className="fieldWrapper" mt={3}>
          <Flex width="64px" fontSize={1} alignItems="center">
            Группа:
          </Flex>
          <Box ml={2} width="100%">
            {getFieldDecorator('group', {
              rules: [{ message: 'Заполните поле name' }],
            })(<Select placeholder="Укажите группу" />)}
          </Box>
        </Flex>

        <Flex className="fieldWrapper" mt={3}>
          <Flex width="64px" fontSize={1} alignItems="center">
            Описание:
          </Flex>
          <Flex ml={2} width="100%">
            {getFieldDecorator('description', {
              rules: [{ message: 'Заполните поле name' }],
            })(<Input placeholder="Введите описание" />)}
          </Flex>
        </Flex>

        <Box mt={4}>
          <Table data={this.state.attributes} minHeight={72 + 48} rowHeight={72} autoHeight rowKey="key">
            <Table.Column width={160} sort>
              <Table.HeaderCell style={{ paddingLeft: '16px' }}>Название</Table.HeaderCell>
              <Table.Cell style={{ paddingLeft: '16px'}} dataKey="name" />
            </Table.Column>

            <Table.Column width={160} sort>
              <Table.HeaderCell style={{ paddingLeft: '16px' }}>Тип</Table.HeaderCell>
              <Table.Cell dataKey="type" />
            </Table.Column>

            <Table.Column width={128} sort>
              <Table.HeaderCell style={{ paddingLeft: '16px' }}>Обязательность</Table.HeaderCell>
              <Table.Cell dataKey="type" />
            </Table.Column>

            <Table.Column width={128} sort>
              <Table.HeaderCell style={{ paddingLeft: '16px' }}>Уникальность</Table.HeaderCell>
              <Table.Cell dataKey="type" />
            </Table.Column>

            <Table.Column width={160} sort>
              <Table.HeaderCell style={{ paddingLeft: '16px' }}>Описание</Table.HeaderCell>
              <Table.Cell dataKey="type" />
            </Table.Column>

            <Table.Column width={96}>
              <Table.HeaderCell>Действия</Table.HeaderCell>
              <Table.Cell>
                  {rowData => (
                    <Icon name="ellipsis-h" onClick={() => { alert(rowData.id)}} />
                  )}
              </Table.Cell>
              {/* <EditCell
                onEditClick={this.handleOnEditClick}
                handleSave={this.handleSave}
                editRowId={this.state.editRowId}
              /> */}
            </Table.Column>
          </Table>

          <Divider />

          <Box mt={3}>
            <Button block onClick={this.handleAddRow}>
              Добавить столбец
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default createForm()(CatalogForm)
