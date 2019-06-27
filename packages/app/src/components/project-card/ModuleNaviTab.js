import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from '@ursip/design-system'
import OptionWithIcon from '../common/OptionWithIcon'
import styled from 'styled-components'

const OffsetBox = styled(Box)`
  padding: 0;
  margin: 0;
  position: relative;
  top: -12%;
`
const OffsetFlexContainer = styled(Flex)`
  padding: 33px;
  margin: 0;
  align-self: center;
  border-bottom: solid 1px #ecebeb;
  width: 100%;
`

const ContentBox = styled(Flex)`
  align-self: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 1440px;
`

const AdressText = styled(Text)``
/*other import goes here*/

function ModuleNaviTab({ props }) {
  /*some private methods*/
  return (
    <OffsetFlexContainer>
      <ContentBox>
        <Flex id-={'leftBox'}>
          <Box id={'greenLine'} bg="#2e7d32" width={'8px'} height={'40px'}></Box>
          <Flex
            id={'projectNameAndAdress'}
            ml={1}
            flexDirection="column"
            height={'40px'}
            align-content={'space-between'}
          >
            <OffsetBox id={'projectNameBox'} p={0} width={'264px'} height={'24px'}>
              <Text id={'projectName'} fontSize={3}>
                Tabs
              </Text>
            </OffsetBox>
            <Box>
              <AdressText
                id={'projectAdress'}
                fontSize={1}
                m={0}
                p={0}
                width={'320px'}
                height={'16px'}
                color={'disabled'}
              >
                Tabs
              </AdressText>
            </Box>
          </Flex>
        </Flex>
        <Box id={'rightBox'}>
          <Flex>
            <OptionWithIcon icon={'filter_none'} option={'Сравнить'} />
            <OptionWithIcon icon={'account_box'} option={'Участники'} />
            <OptionWithIcon icon={'create'} option={'Редактировать'} />
          </Flex>
        </Box>
      </ContentBox>
    </OffsetFlexContainer>
  )
}

ModuleNaviTab.propTypes = {
  jokes: PropTypes.array,
  seen: PropTypes.array,
  opened: PropTypes.array,
}

ModuleNaviTab.defaultProps = {
  jokes: [],
  seen: [],
  opened: [],
}

export default ModuleNaviTab
