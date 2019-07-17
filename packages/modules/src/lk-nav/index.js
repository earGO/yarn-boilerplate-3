import React from 'react'
import * as personalNavigation from './module'
import {useSelector, useDispatch} from 'react-redux'
import {Box, ContentBox, Loading} from '../../import'
import styled from 'styled-components'
import * as selectors from './module/selectors'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import ModuleNavigationTabs from './ModuleNavigationTabs'

const ZIndexed = styled(Box)`
	z-index: 3;
`

function LkNav({...props}) {
	const loading = useSelector(selectors.tabsLoading)
	const LkNavTabs = useSelector(selectors.tabsSelector)
	const tabSelected = useSelector(selectors.selectedTabsSelector)

	const dispatch = useDispatch()

	const notReady = loading && !(LkNavTabs !== undefined)

	return (
		<DynamicModuleLoader modules={[personalNavigation.default]}>
			{notReady ? (
				<Loading overlay>Загрузка навигации</Loading>
			) : (
				<ZIndexed bg={'#f5f5f5'}>
					<ContentBox
						justifyContent={'flex-start'}
						alignItems={'center'}
					>
						<ModuleNavigationTabs
							LkNavTabs={LkNavTabs}
							tabSelected={tabSelected}
						/>
					</ContentBox>
				</ZIndexed>
			)}
		</DynamicModuleLoader>
	)
}

export default LkNav
