import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from '@ursip/design-system'
import styled from 'styled-components'
import OptionUnderline from '../common/OptionUnderline'
import FlexContainerBottomDivider from '../common/FlexContainerBottomDivider'

const OffsetBox = styled(Box)`
  padding: 0;
  margin: 0;
  position: relative;
  top: -12%;
`
const OffsetFlexContainer = styled(Flex)`
  padding: 0px;
  margin: 0;
  align-self: center;
  width: 100%;
`

const ContentBox = styled(Flex)`
  padding: 0px;
  margin: 0;
  align-self: center;
  justify-content: flex-start;
  margin: 0 auto;
  width: 1440px;
`

const AdressText = styled(Text)``
/*other import goes here*/

function ModuleNaviTab({ projectTabs }) {
  if (projectTabs !== undefined) {
    console.log(projectTabs)
    return (
      <FlexContainerBottomDivider>
        <ContentBox>
          {projectTabs.map((tab, key) => {
            return <OptionUnderline key={key}>{tab.name}</OptionUnderline>
          })}
        </ContentBox>
      </FlexContainerBottomDivider>
    )
  } else {
    return null
  }
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
