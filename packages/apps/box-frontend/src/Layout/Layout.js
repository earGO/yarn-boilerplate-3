import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import {Flex, Box, Text, TopNav, LkNav} from '../import'
import {withRouter} from 'react-router-dom'

/**
 * Main application layout
 */
function Layout({children, width, maxWidth, history, ...props}) {
	const handleLogoClick = () => history.push('/')
	const year = new Date().getFullYear()

	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			<TopNav history={history} />
			<Box flex={1} mx="auto" width="100%" style={{overflow: 'hidden'}}>
				{children}
			</Box>
			<Box bg="lightGrey">
				<Box
					p={2}
					mx="auto"
					style={{maxWidth}}
					justifyContent="space-between"
				>
					<Text color="darkGrey" fontSize={0} align="right">
						URSiP &copy; {year}
					</Text>
				</Box>
			</Box>
		</Flex>
	)
}

Layout.defaultProps = {
	maxWidth: 1600,
	// Responsive breackpoints
	width: ['99%', '99%', '99%', '99%']
}

export default withRouter(Layout)
