import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`


function StyledButton() {
        return (
			<div>
				<Button primary
					href="https://github.com/styled-components/styled-components"
				>
					GitHub
				</Button>
				<Button  prefetch  href="/docs">
					Documentation
				</Button>
			</div>
        )
}


export default StyledButton
