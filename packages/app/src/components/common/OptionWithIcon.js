import React from 'react'
import PropTypes from 'prop-types'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import { Flex, Box, Text } from '@ursip/design-system'
import styled from 'styled-components'

const IconSized = styled(Box)`
  transform: scale(0.68);
  font-size: 12px;
  padding: 0;
  margin: 0;
  position: relative;
  top: 20%;
`
const FlexedItem = styled(Flex)`
  padding: 0;
  margin: 0;
`
const IconedItemText = styled(Text)`
  padding-left: 4px;
  padding-right: 24px;
`

function OptionWithIcon({ icon, option }) {
  /*some private methods*/
  return (
    <FlexedItem id={'compare'} flexDirection={'row'} alignItems={'flex-end'}>
      <IconSized>
        <i className={'material-icons'}>{icon}</i>
      </IconSized>
      <IconedItemText fontSize={1}>{option}</IconedItemText>
    </FlexedItem>
  )
}

OptionWithIcon.propTypes = {
  jokes: PropTypes.array,
  seen: PropTypes.array,
  opened: PropTypes.array,
}

OptionWithIcon.defaultProps = {
  jokes: [],
  seen: [],
  opened: [],
}

export default OptionWithIcon
