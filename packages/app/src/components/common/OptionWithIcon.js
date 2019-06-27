import React from 'react'
import PropTypes from 'prop-types'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import { Flex, Text } from '@ursip/design-system'

/*other import goes here*/

function OptionWithIcon({ icon, option }) {
  /*some private methods*/
  return (
    <Flex id={'compare'}>
      <i className={'material-icons md-12'}>{icon}</i>
      <Text>{option}</Text>
    </Flex>
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
