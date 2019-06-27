import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@ursip/design-system'
import styled from 'styled-components'
import FlexContainerBottomDivider from '../common/FlexContainerBottomDivider'

const FieldItem = styled(Box)`
  width: 736px;
`

function FieldsItem({ children, ...props }) {
  return (
    <FlexContainerBottomDivider>
      <FieldItem>{children}</FieldItem>
    </FlexContainerBottomDivider>
  )
}

FieldsItem.propTypes = {}

FieldsItem.defaultProps = {}

export default FieldsItem
