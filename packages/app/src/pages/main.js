import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Card, Heading, Text } from '@ursip/design-system'

class Main extends React.PureComponent {
  render() {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Card boxShadowSize="md" p={2}>
          <Heading align="center">Main page</Heading>
          <Text align="center">Hello from main page</Text>
          <Link to="/nsi">nsi</Link>
        </Card>
      </Flex>
    )
  }
}

export default Main
