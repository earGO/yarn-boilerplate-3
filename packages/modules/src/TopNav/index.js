import React from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Flex, Box, ContentBox, OptionUnderline} from '../../import'
import Logo from './Logo'
import GlobalSearch from './GlobalSearch'
import Actions from './Actions'
import Notifications from './Notifications'
import Profile from './Profile'
import styled from 'styled-components'

const ZIndexed = styled(Box)`
	z-index: 4;
`

function TopNav({...props}) {
	const dispatch = useDispatch()

	return (
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
				<ContentBox justifyContent={'flex-start'} alignItems={'center'}>
					<OptionUnderline>Главная</OptionUnderline>
					<OptionUnderline>Инструменты</OptionUnderline>
					<OptionUnderline>Услуги</OptionUnderline>
					<OptionUnderline>Помощь</OptionUnderline>
					<Profile />
				</ContentBox>
			</ZIndexed>
		</Flex>
	)
}

export default TopNav
