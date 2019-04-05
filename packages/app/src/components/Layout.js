import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

import { Flex, Box, Text, Input, Button, Card } from '@ursip/design-system'
import Header from './Header'
import Menu from './Menu'

const width = '90%'

const menuItems = [
  {
    key: '0',
    name: 'Инструменты',
    url: '/',
    qs: null,
    children: [
      {
        key: '0-0',
        name: 'НСИ',
        url: '/nsi',
        qs: null,
      },
      // {
      //   key: '0-1',
      //   name: 'Вьювер',
      //   url: '/viewer',
      //   qs: null,
      // },
    ],
  },
  // {
  //   key: '1',
  //   name: 'О компании',
  //   url: '/about',
  //   qs: null,
  // },
]

class Layout extends Component {
  handleMenuClick = item => {
    console.log(item)
  }

  render() {
    return (
      <StickyContainer>
        <Sticky topOffset={0}>
          {({ style }) => (
            <div style={{ ...style, zIndex: 10 }}>
              <Header width={width} />
              <Menu items={menuItems} width={width} />
            </div>
          )}
        </Sticky>
        <Box width={width} mx="auto">
          {this.props.children}
        </Box>
        <Box width={width} mx="auto" py={3}>
          <Text align="right" fontSize={0}>
            URSiP &copy; 2019
          </Text>
        </Box>
      </StickyContainer>
    )
  }
}

export default Layout
