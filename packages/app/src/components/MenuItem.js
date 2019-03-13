import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Box, Text } from '@ursip/design-system'

const Item = styled(Box)`
  cursor: pointer;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${props => (props.active ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.active ? props.theme.colors.primary : 'inherit')};
  transition: color 0.3s, border-bottom-color 0.3s;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

function MenuItem(props) {
  return (
    <Item {...props} py={13}>
      <Text>{props.name}</Text>
    </Item>
  )
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  qs: PropTypes.string,
  active: PropTypes.bool,
}

MenuItem.defaultProps = {
  active: true,
}

export default MenuItem
