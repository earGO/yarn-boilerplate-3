import React from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Box, Flex, ContentBox, OptionUnderline} from '../../import'
import Profile from '../TopNav/Profile'

function LkNav({...props}) {
	// const someVariable = useSelector(selectors.someSelector)

	const dispatch = useDispatch()

	// const someAction = () => dispatch(actions.someAction)

	return (
		<Box bg={'#f5f5f5'}>
			<ContentBox justifyContent={'flex-start'} alignItems={'center'}>
				<OptionUnderline>Главная</OptionUnderline>
				<OptionUnderline>Инструменты</OptionUnderline>
				<OptionUnderline>Услуги</OptionUnderline>
				<OptionUnderline>Помощь</OptionUnderline>
				<Profile />
			</ContentBox>
		</Box>
	)
}

export default LkNav
