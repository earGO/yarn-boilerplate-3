import React from 'react'
import Link from '../common/Link'
import { Box, Heading } from '@ursip/design-system'
import Form from './Form'

function Main() {
  return (
    <Box m={3}>
      <Heading mb={2}>ursip frontend modules</Heading>
      <Link bordered to="/nsi">
        nsi
      </Link>

      <Form />
    </Box>
  )
}

export default Main
