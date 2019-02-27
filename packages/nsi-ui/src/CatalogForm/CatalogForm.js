import React from 'react'
import { Select, Input, Form, Icon, Divider, Box, Button, Flex } from '@ursip/design-system'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import nsi from '@ursip/nsi-service'
import CatalogTable from './CatalogTable'

const createForm = Form.createForm

// attributes: [{key: "2a0d678e-464d-4b7b-aea6-eb37f5855feb"}]
// description: "Описания нужны."
// group: "Группаааа"
// name: "Тестовый каталог"
// type: false

class CatalogForm extends React.Component {
  state = {
    // В оригинальном коде эти uuid генерились, через пакет uuid().
    uuid: 2,
  }

  componentDidUpdate() {
    console.log('Update redux state here maybe?', this.props.form.getFieldsValue());
  }

  handleAddRow = () => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes') || []
    form.setFieldsValue({
      attributes: attributes.concat({ id: this.state.uuid }),
    })
    this.setState(prevState => ({
      uuid: prevState.uuid + 1,
    }))
  }

  handleItemChange = (field, id) => value => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes')
    let attributeIndex = attributes.findIndex(item => item.id === id)
    let updatedAttribute = { ...attributes[attributeIndex], [field]: value }
    let attributesCopy = attributes.slice()
    attributesCopy[attributeIndex] = updatedAttribute
    form.setFieldsValue({
      attributes: attributesCopy,
    })
  }

  handleItemDelete = (id) => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes')
    console.log('Deleting row with id', id);
    form.setFieldsValue({
      attributes: attributes.filter(attr => attr.id !== id),
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { catalogToEdit = {} } = this.props
    return (
      <Box>
        <Flex className="fieldWrapper">
          <Flex width="64px" fontSize={1} alignItems="center">
            Название:
          </Flex>
          <Flex ml={2} width="100%">
            {getFieldDecorator('name', {
              initialValue: catalogToEdit.name,
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
              initialValue: catalogToEdit.group,
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
              initialValue: catalogToEdit.description,
              rules: [{ message: 'Заполните поле name' }],
            })(<Input placeholder="Введите описание" />)}
          </Flex>
        </Flex>
        {/** Просто регистрируем поле.*/}
        {getFieldDecorator('attributes', { initialValue: catalogToEdit.attributes })(<Input style={{ display: 'none' }} />)}

        <Box mt={4} id="tableWrapper">
          <CatalogTable
            attributes={this.props.form.getFieldValue('attributes')}
            handleItemChange={this.handleItemChange}
            handleItemDelete={this.handleItemDelete}
          />
          <Divider />

          <Box mt={3} alignItems="center">
            <Button type="secondary" block onClick={this.handleAddRow}>
              <Icon name="plus-circle" mr={2} />
              Добавить столбец
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  if (id) {
    const catalogToEdit = nsi.reselectors.catalogs.getCatalogById(state, id)
    return {
      ...ownProps,
      catalogToEdit,
    }
  }
  return {
    ...ownProps,
  }
}

const enhanced = compose(
  createForm(),
  withRouter,
  connect(mapStateToProps),
)

export default enhanced(CatalogForm)
