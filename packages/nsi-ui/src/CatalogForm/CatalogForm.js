import React from 'react'
import ReactDOM from 'react-dom'
import { Input, Form, Icon, Divider, Box, Button, Flex, Text, Toggle } from '@ursip/design-system'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import produce from 'immer'
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
    const newKey = uuid()
    const placeholderItem = {
      key: newKey,
      type: 'string',
      removed: false,
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

  handleTypeChange = (rowKey, key) => valueObj => {
    const { form } = this.props
    const actualValue = valueObj.value || null
    const attributes = form.getFieldValue('attributes')
    console.log('Before', attributes)
    const nextAttributes = produce(attributes, draft => {
      let attributeIndex = attributes.findIndex(item => item.key === rowKey)
      switch (key) {
        case 'type': {
          if (actualValue === 'ref_link') {
            draft[attributeIndex].type = {
              type: actualValue,
              catalogId: null,
              attributeId: null,
            }
          } else {
            draft[attributeIndex].type = actualValue
          }
          break
        }
        case 'catalogId': {
          draft[attributeIndex].type.catalogId = actualValue
          draft[attributeIndex].type.attributeId = null
          break
        }
        case 'attributeId': {
          draft[attributeIndex].type.attributeId = actualValue
        }
      }
    })
    console.log('After', nextAttributes)
    form.setFieldsValue({
      attributes: nextAttributes,
    })
  }

  handleItemDelete = key => {
    const { form } = this.props
    const attributes = form.getFieldValue('attributes')
    const updatedAttributes = attributes.map(attribute => {
      return attribute.key === key
        ? { ...attribute, removed: true }
        : attribute
    });
    form.setFieldsValue({
      attributes: updatedAttributes
    })
  }

  handleSave = form => {
    console.log('I can handle catalog save now!', form.getFieldsValue())
    const { validateFieldsAndScroll } = form
    const { history } = this.props

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // Редиректнем на страницу созданного/измененного каталога.
        const callback = action => history.push(`/nsi/${action.payload.data.id}`)
        const payload = {
          payload: values,
          meta: { asPromise: true },
        }
        values.id
          ? this.props.updateCatalog(payload).then(callback) 
          : this.props.createCatalog(payload).then(callback)
      }
    })
  }

  renderSaveButton = id => {
    // #Пиздос
    let targetNode = id
      ? document.getElementById('editCatalogButtonContainer')
      : document.getElementById('createCatalogButtonContainer')
    return targetNode
      ? ReactDOM.createPortal(
          <Button block onClick={() => this.handleSave(this.props.form)}>
            Сохранить
          </Button>,
          targetNode,
        )
      : null
  }

  getCatalogTableDatasource = () => {
    const allAttributes = this.props.form.getFieldValue('attributes') || []
    return allAttributes.filter(item => item.removed === false)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { catalogToEdit = {} } = this.props
    return (
      <Box>
        {/** Скрытое поле id */}
        {getFieldDecorator('id', { initialValue: catalogToEdit.id })(<Input style={{ display: 'none' }} />)}
        {/** Просто регистрируем поле, чтобы работать с ним через form.*/}
        {getFieldDecorator('attributes', { initialValue: catalogToEdit.attributes })(
          <Input style={{ display: 'none' }} />,
        )}
        <Flex className="fieldWrapper" alignItems="center">
          <Box flex="0 0 128px">
            <Text>Название:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('name', {
              initialValue: catalogToEdit.name || '',
              rules: [{ message: 'Заполните поле название' }],
            })(<Input placeholder="Введите название" />)}
          </Box>
        </Flex>

        <Flex className="fieldWrapper" mt={3} alignItems="center">
          <Box flex="0 0 128px">
            <Text>Код справочника:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('code', {
              initialValue: catalogToEdit.code || '',
              rules: [{ message: 'Заполните поле код' }],
            })(<Input placeholder="Введите код" />)}
          </Box>
        </Flex>

        <Flex className="fieldWrapper" mt={3} alignItems="center">
          <Box flex="0 0 128px">
            <Text>Группа:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('group', {
              initialValue: catalogToEdit.group || '',
              rules: [{ message: 'Заполните поле группа' }],
            })(<Input placeholder="Укажите группу" />)}
          </Box>
        </Flex>

        <Flex className="fieldWrapper" mt={3} alignItems="center">
          <Box flex="0 0 128px">
            <Text>Описание:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('description', {
              initialValue: catalogToEdit.description || '',
              rules: [{ message: 'Заполните поле описание' }],
            })(<Input placeholder="Введите описание" />)}
          </Box>
        </Flex>
        <Flex className="fieldWrapper" mt={3} alignItems="center">
          <Box flex="0 0 128px">
            <Text>Иерархический:</Text>
          </Box>
          <Box ml={2} flex={1}>
            {getFieldDecorator('type', {
              initialValue: catalogToEdit.type || false,
            })(<Toggle />)}
          </Box>
        </Flex>

        <Box mt={4} id="tableWrapper">
          <CatalogTable
            refCatalogs={this.props.catalogs}
            attributes={this.getCatalogTableDatasource()}
            handleItemChange={this.handleItemChange}
            handleItemDelete={this.handleItemDelete}
            handleTypeChange={this.handleTypeChange}
          />

          <Box mt={3} alignItems="center">
            <Button type="secondary" block onClick={this.handleAddRow}>
              <Icon name="plus" mr={2} />
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
      catalogs: nsi.selectors.catalogs(state),
    }
  }
  return {
    ...ownProps,
    catalogs: nsi.selectors.catalogs(state),
  }
}

const enhanced = compose(
  createForm(),
  withRouter,
  connect(
    mapStateToProps,
    { createCatalog, updateCatalog },
  ),
)

export default enhanced(CatalogForm)
