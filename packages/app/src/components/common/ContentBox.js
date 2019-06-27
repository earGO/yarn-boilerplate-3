import React from 'react'
import { Flex } from '@ursip/design-system'
import styled from 'styled-components'

const ContentBoxStyle = styled(Flex)`
  padding-top: ${props => props.padding + 'px'};
  padding-bottom: ${props => props.padding + 'px'};
  margin: 0;
  align-self: center;
  justify-content: ${props => props.justifyContent};
  margin: 0 auto;
  width: 1440px;
`

function ContentBox({ children, padding, justifyContent, ...props }) {
  /*some private methods*/
  return (
    <ContentBoxStyle padding={padding} justifyContent={justifyContent}>
      {children}
    </ContentBoxStyle>
  )
}

export default ContentBox
