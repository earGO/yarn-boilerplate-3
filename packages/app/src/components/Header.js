import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { Flex, Box, Text, Button, Icon } from '@ursip/design-system'
import SearchInput from './SearchInput'
import Badge from './Badge'
// import logo from './logo.svg'
import logo from '../assets/ursip-logo.svg'
import store from '../store'

class Header extends React.PureComponent {
  render() {
    const { width } = this.props
    return (
      <Flex height={56} bg="primary">
        <Flex width={width} alignItems="center" style={{ margin: '0 auto' }}>
          <Flex alignItems="center">
            <img style={{ width: 50, height: 50}} src={logo} />
          </Flex>
          <Box ml={4}>
            <SearchInput />
          </Box>
          <Box ml="auto">
            {/* <Text inline color="#f5f5f5" mr={4}>
              <Badge mr={2}>3</Badge>
              Уведомления
            </Text> */}
            <Button
              size="small"
              type="bordered"
              onClick={() => store.history.push('/nsi/create')}
              style={{
                borderColor: '#ecebeb',
                padding: '4px 10px',
              }}
            >
              <Text inline color="#f5f5f5">
                <Icon top={1} name="plus" mr={2} />
                Создать справочник
              </Text>
            </Button>
          </Box>
          <Box ml={4}>
            <Text inline color="white" style={{ cursor: 'pointer' }}>
              <Icon fontSize="27px" top={1} name="user-circle" />
              <Icon fontSize="12px" top={-4} ml={2} name="caret-down" />
            </Text>
          </Box>
        </Flex>
      </Flex>
    )
  }
}

export default Header
