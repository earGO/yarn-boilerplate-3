import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Icon, Flex, Relative} from '../../import'

const Hoverer = styled(Flex)`
	transition: all 0.15s ease-in;
	cursor: pointer;
	&:hover {
		transform: scale(1.025);
	}
`

function Profile({props}) {
	return (
		<Hoverer mt={2}>
			<Icon name={'account_circle'} color={'white'} size={3} />
			<Relative top={'6px'}>
				<Icon name={'arrow_drop_down'} color={'white'} size={2} />
			</Relative>
		</Hoverer>
	)
}

Profile.propTypes = {}

Profile.defaultProps = {}

export default Profile
