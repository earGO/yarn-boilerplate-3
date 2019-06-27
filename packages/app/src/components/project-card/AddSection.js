import React from 'react'
import PropTypes from 'prop-types'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import { Flex, Box, Text } from '@ursip/design-system'
import styled from 'styled-components'

const IconSized = styled(Box)`
  transform: scale(0.68);
  font-size: 12px;
  padding: 0;
  padding-left: 10px;
  margin: 0;
  position: relative;
  top: 20%;
  color: ${props => props.theme.colors[props.color]};
`

function AddSection({ props }) {
  return (
    <Flex flexDirection={'row'} justifyContent={'flex-start'} alignItems={'baseline'}>
      <IconSized color={'primary'}>
        <i className={'material-icons'}>add_circle_outline</i>
      </IconSized>

      <Text color={'primary'}>Добавить подраздел</Text>
    </Flex>
  )
}

AddSection.propTypes = {}

AddSection.defaultProps = {}

export default AddSection
