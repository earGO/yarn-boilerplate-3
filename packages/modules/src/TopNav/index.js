import React from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Flex, Box, ContentBox, OptionUnderline} from '../../import'
import Logo from './Logo'
import GlobalSearch from './GlobalSearch'
import Actions from './Actions'
import Notifications from './Notifications'
import Profile from './Profile'

function TopNav({...props}) {
	const dispatch = useDispatch()

	return (
		<Flex flexDirection={'column'}>
			<Box bg="primary" height={'56px'}>
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
			</Box>
			<Box>
				<ContentBox justifyContent={'flex-start'} alignItems={'center'}>
					<OptionUnderline>Главная</OptionUnderline>
					<OptionUnderline>Инструменты</OptionUnderline>
					<OptionUnderline>Услуги</OptionUnderline>
					<OptionUnderline>Помощь</OptionUnderline>
					<Profile />
				</ContentBox>
			</Box>
		</Flex>
	)
}

export default TopNav
