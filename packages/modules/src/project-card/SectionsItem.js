import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@ursip/design-system'
import styled from 'styled-components'
import FlexContainerBottomDivider from '../common/FlexContainerBottomDivider'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './module/actions'
import * as selectors from './module/selectors'

const SectionItemBox = styled(Box)`
  width: 352px;
  height: 32px;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors[props.background]};
  }
`

const SelectedSectionItemBox = styled(Box)`
  width: 352px;
  height: 32px;
  cursor: pointer;
  background-color: ${props => props.theme.colors[props.background]};
`

function SectionsItem({ children, sectionId, selectSection, ...props }) {
  const selectedSection = useSelector(selectors.selectedSectionSelector)

  if (selectedSection === sectionId) {
    return (
      <FlexContainerBottomDivider>
        <SelectedSectionItemBox background={'border'} p={2} onClick={() => selectSection(sectionId)}>
          <Text fontSize={1}>{children}</Text>
        </SelectedSectionItemBox>
      </FlexContainerBottomDivider>
    )
  } else {
    return (
      <FlexContainerBottomDivider>
        <SectionItemBox background={'border'} p={2} onClick={() => selectSection(sectionId)}>
          <Text fontSize={1}>{children}</Text>
        </SectionItemBox>
      </FlexContainerBottomDivider>
    )
  }
}

SectionsItem.propTypes = {
  background: PropTypes.string,
}

SectionsItem.defaultProps = {
  background: 'border',
}

export default SectionsItem
