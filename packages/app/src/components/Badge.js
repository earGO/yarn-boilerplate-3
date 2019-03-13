import React from 'react'
import styled from 'styled-components'
import { Text } from '@ursip/design-system'

const Badge = styled(Text)`
  border: 1px solid ${props => props.theme.colors.red};
  background: ${props => props.theme.colors.red};
  border-radius: 50%;
  color: white;
  text-align: center;
  min-width: 20px;
`

Badge.defaultProps = {
  inline: true,
  mx: 2,
  px: 0,
  fontSize: 0,
}

export default Badge
