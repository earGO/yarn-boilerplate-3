import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@ursip/design-system'
import styled from 'styled-components'

const MyButton = styled.button`
  height: 58px;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  position: relative;
  top: 1px;

  &:hover {
    border-bottom: 1px solid blue;
    cursor: pointer;
  }
`
function OptionUnderline({ children, ...props }) {
  return <MyButton>{children}</MyButton>
}

OptionUnderline.propTypes = {}

OptionUnderline.defaultProps = {}

export default OptionUnderline
