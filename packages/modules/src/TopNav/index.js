import React from 'react'
import PropTypes from 'prop-types'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import {useSelector, useDispatch} from 'react-redux'
import * as mainNavigation from './module'
import {Flex, Box, ContentBox, OptionUnderline, Loading} from '../../import'
import Logo from './Logo'
import GlobalSearch from './GlobalSearch'
import Actions from './Actions'
import Notifications from './Notifications'
import Profile from './Profile'
import styled from 'styled-components'
import * as selectors from './module/selectors'
import NavigationPanel from './NavigationPanel'

const ZIndexed = styled(Box)`
	z-index: 4;
`

function TopNav({...props}) {
	const loading = useSelector(selectors.tabsLoading)
	const mainNavTabs = useSelector(selectors.tabsSelector)
	const tabSelected = useSelector(selectors.selectedTabsSelector)

	const dispatch = useDispatch()

	const notReady = loading && !(mainNavTabs !== undefined)

	return (
		<DynamicModuleLoader modules={[mainNavigation.default]}>
			{notReady ? (
				<Loading overlay>Загрузка карточки проекта</Loading>
			) : (
				<Flex flexDirection={'column'}>
					<ZIndexed bg="primary" height={'56px'}>
						<ContentBox
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Logo />
							<GlobalSearch />
							<Notifications />
							<Actions />
							<Profile />
						</ContentBox>
					</ZIndexed>
					<ZIndexed>
						<NavigationPanel
							mainNavTabs={mainNavTabs}
							tabSelected={tabSelected}
						/>
					</ZIndexed>
				</Flex>
			)}
		</DynamicModuleLoader>
	)
}

export default TopNav
