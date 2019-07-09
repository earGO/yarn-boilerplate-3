import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Flex, Box, Text } from '@ursip/design-system'
import { withRouter } from 'react-router-dom'

import Logo from './Logo'
import pkg from '../../../package.json'

/**
 * Main application layout
 */
function Layout({ children, width, maxWidth, history, ...props }) {
  const handleLogoClick = () => history.push('/')
  const year = new Date().getFullYear()

  return (
    <Flex height="100vh" flexDirection="column" alignItems="stretch" {...props}>
      {/*      <Box bg="primary">
        <Flex px={2} mx="auto" alignItems="center" height={53} style={{ maxWidth }}>
          <Box>
            <Logo style={{ cursor: 'pointer' }} onClick={handleLogoClick} />
          </Box>
          <Box ml={3}>
            <Text bold fontSize={2}>
              {pkg.name}
            </Text>
            <Text fontSize={0}>{pkg.description}</Text>
          </Box>
          <Box ml={3} />
        </Flex>
      </Box>*/}
      <Box flex={1} style={{ overflow: 'hidden' }}>
        {children}
      </Box>
      <Box bg="lightGrey">
        <Box p={2} mx="auto" style={{ maxWidth }} justifyContent="space-between">
          <Text color="darkGrey" fontSize={0} align="right">
            URSiP &copy; {year}
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

Layout.defaultProps = {
  maxWidth: 1600,
  // Responsive breackpoints
  width: ['99%', '99%', '99%', '99%'],
}

export default withRouter(Layout)
