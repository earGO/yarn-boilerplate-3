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
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: ${props => props.theme.colors[props.bottomColor]};
    cursor: pointer;
  }
`
function OptionUnderline({ children, bottomColor, ...props }) {
  return <MyButton bottomColor={bottomColor}>{children}</MyButton>
}

OptionUnderline.propTypes = {
  bottomColor: PropTypes.string,
}

OptionUnderline.defaultProps = {
  bottomColor: 'primary',
}

export default OptionUnderline
