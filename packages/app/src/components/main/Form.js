import React from 'react'
import PropTypes from 'prop-types'
import { Box, Form, Button, Input, Select } from '@ursip/design-system'

import DynamicForm from '../common/DynamicForm'

const createForm = Form.create
const FormItem = Form.Item

const renderTemplate = getField => {
  return (
    <>
      <FormItem inline>
        {getField('input', {
          rules: [{ required: true, message: 'Заполните поле name' }],
        })(<Select />)}
      </FormItem>
    </>
  )
}

function ExampleForm(props) {
  const { form } = props

  const handleSubmit = event => {
    event.preventDefault()
    const { validateFields } = form
    validateFields((err, values) => {
      if (!err) {
        console.log(values)
        props.onSubmit(values)
      }
    })
  }

  return (
    <Box width={500}>
      <Form>
        <DynamicForm form={form} renderTemplate={renderTemplate} group="aaa" />
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </Box>
  )
}

ExampleForm.propTypes = {
  form: PropTypes.object,
  renderTemplate: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default createForm()(ExampleForm)
