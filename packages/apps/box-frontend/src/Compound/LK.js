import React, {useRef} from 'react'
import {Box, Flex, LkNav, Scrollbars} from '../import'
import Lk from '../LazyLoad/LK'

function LK({...props}) {
	const scrollBarsRef = useRef(null)
	const onUpButtonClick = () => {
		console.log(scrollBarsRef.current)
	}
	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			<LkNav onUpButtonClick={onUpButtonClick} />
			<Box flex={1} mx="auto" width="100%" style={{overflow: 'hidden'}}>
				<Scrollbars universal style={{height: 760}} ref={scrollBarsRef}>
					<Lk />
				</Scrollbars>
			</Box>
		</Flex>
	)
}

export default LK
