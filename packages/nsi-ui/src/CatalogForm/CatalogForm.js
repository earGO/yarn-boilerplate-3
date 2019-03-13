import React from 'react'
import ReactDOM from 'react-dom'
import { Select, Input, Form, Icon, Divider, Box, Button, Flex, Text } from '@ursip/design-system'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import nsi from '@ursip/nsi-service'
import CatalogTable from './CatalogTable'
// Использовалось в старом НСИ.
import uuid from 'uuid/v4'


const { create: createCatalog, update: updateCatalog } = nsi.actions.catalogs
const createForm = Form.createForm

class CatalogForm extends React.Component {
  componentDidMount() {
    // Mounts the save button!
    setTimeout(() => {
      this.forceUpdate()
    }, 0)
  }

  handleAddRow = () => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes') || []
    const newKey = uuid();
    const placeholderItem = {
      key: newKey,
      type: { label: 'Строка', value: 'string' }
    }
    form.setFieldsValue({
      attributes: attributes.concat(placeholderItem),
    })
  }

  handleItemChange = (field, key) => value => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes')
    let attributeIndex = attributes.findIndex(item => item.key === key)
    let updatedAttribute = { ...attributes[attributeIndex], [field]: value }
    let attributesCopy = attributes.slice()
    attributesCopy[attributeIndex] = updatedAttribute
    form.setFieldsValue({
      attributes: attributesCopy,
    })
  }

  handleItemDelete = (key) => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes')
    form.setFieldsValue({
      attributes: attributes.filter(attr => attr.key !== key),
    })
  }

  handleSave = (form) => {
    console.log('I can handle catalog save now!', form.getFieldsValue())
    const { validateFieldsAndScroll } = form
    const { history } = this.props
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formattedValues = {
          ...values,
          // Уберем вложенность из значения селекта "Тип"
          attributes: values.attributes.map(item => ({ ...item, type: item.type ? item.type.value : null }))
        }
        // Редиректнем на страницу созданного каталога.
        const callback = (action) => history.push(`/nsi/${action.payload.data.id}`)
        const payload = {
          payload: formattedValues,
          meta: { asPromise: true },
        }
        values.id
          ? this.props.updateCatalog(payload).then((hello) => { console.log(hello) })
          : this.props.createCatalog(payload).then(callback)
      }
    })
  }

  renderSaveButton = (id) => {
    // #Пиздос
    let targetNode = id
      ? document.getElementById('editCatalogButtonContainer')
      : document.getElementById('createCatalogButtonContainer')
    return targetNode ? ReactDOM.createPortal(
      <Button block onClick={() => this.handleSave(this.props.form)}>Сохранить</Button>,
      targetNode
    ) : null
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { catalogToEdit = {} } = this.props
    return (
      <Box>
        {/** Скрытое поле id */}
        {getFieldDecorator('id', { initialValue: catalogToEdit.id })(<Input style={{ display: 'none'}} />)}
        {/** Просто регистрируем поле, чтобы работать с ним через form.*/}
        {getFieldDecorator('attributes', { initialValue: catalogToEdit.attributes })(<Input style={{ display: 'none' }} />)}
        <Flex className="fieldWrapper" alignItems="center">
          <Box flex="0 0 64px">
            <Text fontSize={0}>Название:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('name', {
              initialValue: catalogToEdit.name || '',
              rules: [{ message: 'Заполните поле название' }],
            })(<Input placeholder="Введите название" />)}
          </Box>
        </Flex>

        <Flex className="fieldWrapper" mt={3} alignItems="center">
          <Box flex="0 0 64px">
            <Text fontSize={0}>Группа:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('group', {
              initialValue: catalogToEdit.group || '',
              rules: [{ message: 'Заполните поле группа' }],
            })(<Select placeholder="Укажите группу" />)}
          </Box>
        </Flex>

        <Flex className="fieldWrapper" mt={3} alignItems="center">
          <Box flex="0 0 64px" >
            <Text fontSize={0}>Описание:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('description', {
              initialValue: catalogToEdit.description || '',
              rules: [{ message: 'Заполните поле описание' }],
            })(<Input placeholder="Введите описание" />)}
          </Box>
        </Flex>
  
        <Box mt={4} id="tableWrapper">
          <CatalogTable
            attributes={this.props.form.getFieldValue('attributes')}
            handleItemChange={this.handleItemChange}
            handleItemDelete={this.handleItemDelete}
          />

          <Box mt={3} alignItems="center">
            <Button type="secondary" block onClick={this.handleAddRow}>
              <Icon name="plus-circle" mr={2} />
              Добавить столбец
            </Button>
          </Box>
        </Box>
        {this.renderSaveButton(catalogToEdit.id)}
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
  connect(mapStateToProps, { createCatalog, updateCatalog }),
)

export default enhanced(CatalogForm)
