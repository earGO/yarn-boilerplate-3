import React from 'react'
import styled from 'styled-components'
import { Input, Icon } from '@ursip/design-system'

const StyledInput = styled(Input)`
  border-color: transparent;
`

function SearchInput() {
  const prefix = <Icon color="#3a3a3a" fontSize="12px" name="search" />
  return <StyledInput width={408} prefix={prefix} size="small" placeholder="Введите название справочника" />
}

export default SearchInput
