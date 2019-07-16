import React from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Box, Flex, ContentBox, OptionUnderline} from '../../import'
import styled from 'styled-components'

const ZIndexed = styled(Box)`
	z-index: 3;
`

function LkNav({...props}) {
	// const someVariable = useSelector(selectors.someSelector)

	const dispatch = useDispatch()

	// const someAction = () => dispatch(actions.someAction)

	return (
		<ZIndexed bg={'#f5f5f5'}>
			<ContentBox justifyContent={'flex-start'} alignItems={'center'}>
				<OptionUnderline>Все стадии</OptionUnderline>
				<OptionUnderline>ОБИН</OptionUnderline>
				<OptionUnderline>Проектирование</OptionUnderline>
				<OptionUnderline>Строительство</OptionUnderline>
				<OptionUnderline>Эксплуатация</OptionUnderline>
				<OptionUnderline>Снос</OptionUnderline>
			</ContentBox>
		</ZIndexed>
	)
}

export default LkNav
