import React from 'react'
import {Box, Flex, LkNav} from '../import'
import Lk from '../LazyLoad/LK'

function LK({...props}) {
	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			<LkNav />
			<Box flex={1} style={{overflow: 'auto'}}>
				<Lk />
			</Box>
		</Flex>
	)
}

export default LK
