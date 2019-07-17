import React from 'react'
import styled from 'styled-components'

import {Flex, Text, Icon, Box} from '../../import'

const CustomButton = styled(Flex)`
	border: 1px solid white;
	border-radius: 4px;
	width: 88px;
	height: 32px;
	cursor: pointer;
	transition: all 0.15s ease-in-out;
	&:hover {
		transform: scale(1.025);
	}
`

function Actions({props}) {
	/*some private methods*/
	return (
		<CustomButton
			alignItems={'center'}
			justifyContent={'space-evenly'}
			mt={2}
		>
			<Icon name={'add'} color={'white'} />
			<Text color={'white'} fontSize={'12px'}>
				Создать проект
			</Text>
		</CustomButton>
	)
}

export default Actions
