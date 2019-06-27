import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@ursip/design-system'
import styled from 'styled-components'
import FlexContainerBottomDivider from '../common/FlexContainerBottomDivider'

const SectionItemBox = styled(Box)`
  width: 352px;
  height: 32px;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors[props.background]};
  }
`

function SectionsItem({ children, ...props }) {
  /*some private methods*/
  return (
    <FlexContainerBottomDivider>
      <SectionItemBox background={'border'} p={2}>
        <Text fontSize={1}>{children}</Text>
      </SectionItemBox>
    </FlexContainerBottomDivider>
  )
}

SectionsItem.propTypes = {
  background: PropTypes.string,
}

SectionsItem.defaultProps = {
  background: 'border',
}

export default SectionsItem
