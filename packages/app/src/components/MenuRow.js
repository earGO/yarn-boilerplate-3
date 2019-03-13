import React from 'react'
import styled from 'styled-components'
import { Flex } from '@ursip/design-system'

const Wrapper = styled(Flex)`
  border-bottom: 1px solid #ebebeb;
`

const Inner = styled(Flex)`
  position: relative;
  margin: 0 auto;
  top: 1px;
`

function MenuRow(props) {
  return (
    <Wrapper bg={props.bg}>
      <Inner width={props.width}>{props.children}</Inner>
    </Wrapper>
  )
}

export default MenuRow
