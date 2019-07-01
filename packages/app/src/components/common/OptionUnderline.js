import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@ursip/design-system'
import styled from 'styled-components'

const UnderlinedButton = styled.button`
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

const SelectedUnderlinedButton = styled.button`
  height: 58px;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  position: relative;
  top: 1px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors[props.bottomColor]};
`
function OptionUnderline({ children, bottomColor, tabSelected, tabId, ...props }) {
  if (tabId === tabSelected) {
    return <SelectedUnderlinedButton bottomColor={bottomColor}>{children}</SelectedUnderlinedButton>
  } else {
    return <UnderlinedButton bottomColor={bottomColor}>{children}</UnderlinedButton>
  }
}

OptionUnderline.propTypes = {
  bottomColor: PropTypes.string,
}

OptionUnderline.defaultProps = {
  bottomColor: 'primary',
}

export default OptionUnderline
