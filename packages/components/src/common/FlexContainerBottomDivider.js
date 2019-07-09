import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from '@ursip/design-system'

const FlexContainer = styled(Flex)`
  margin: 0;
  align-self: center;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors[props.dividercolor]};
`

/*other import goes here*/

function FlexContainerBottomDivider({ children, dividercolor, ...props }) {
  /*some private methods*/
  return <FlexContainer dividercolor={dividercolor}>{children}</FlexContainer>
}

FlexContainerBottomDivider.propTypes = {
  dividercolor: PropTypes.string,
}

FlexContainerBottomDivider.defaultProps = {
  dividercolor: 'border',
}

export default FlexContainerBottomDivider
