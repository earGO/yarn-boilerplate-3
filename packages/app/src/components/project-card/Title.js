import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text } from '@ursip/design-system'

/*other import goes here*/

function Title({ projectTitle }) {
  console.log(projectTitle)
  /*some private methods*/
  return (
    <Flex>
      <Box id={'greenLine'} bg="#2e7d32" width={'8px'} height={'40px'}></Box>
      <Flex
        id={'projectNameAndAdress'}
        flexDirection="column"
        height={'40px'}
        align-content={'space-between'}
        m={0}
        p={0}
      >
        <Text id={'projectName'} fontSize={3} m={0} p={0}>
          {projectTitle.projectName}
        </Text>
        <Text id={'projectAdress'} fontSize={1} m={0} p={0}>
          {projectTitle.projectAdress}
        </Text>
      </Flex>
    </Flex>
  )
}

Title.propTypes = {
  jokes: PropTypes.array,
  seen: PropTypes.array,
  opened: PropTypes.array,
}

Title.defaultProps = {
  jokes: [],
  seen: [],
  opened: [],
}

export default Title
