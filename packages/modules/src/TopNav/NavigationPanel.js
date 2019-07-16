import React from 'react'
import {useDispatch} from 'react-redux'
import * as actions from './module/actions'
import {ContentBox, OptionUnderline} from '../../import'

function NavigationPanel({mainNavTabs, tabSelected, ...props}) {
	const dispatch = useDispatch()

	const selectTab = tabId => dispatch(actions.selectOption(tabId)) // The action to select  a tab

	if (mainNavTabs !== undefined && mainNavTabs !== null) {
		return (
			<ContentBox justifyContent={'flex-start'} alignItems={'center'}>
				{mainNavTabs.map((tab, key) => {
					return (
						<OptionUnderline
							key={key}
							bottomColor={'primary'}
							tabSelected={tabSelected}
							tabId={tab.id}
							selectTab={selectTab}
						>
							{tab.value}
						</OptionUnderline>
					)
				})}
			</ContentBox>
		)
	} else {
		return null
	}
}

export default NavigationPanel
