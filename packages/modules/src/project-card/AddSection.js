import React from 'react';
import materialIcons from 'material-design-icons/iconfont/material-icons.css';
import {Flex, Box, Text} from '@ursip/design-system';
import styled from 'styled-components';

const IconSized = styled(Box)`
	transform: scale(0.68);
	font-size: 12px;
	padding: 0;
	padding-left: 10px;
	margin: 0;
	position: relative;
	top: 40%;
	cursor: pointer;
	color: ${props => props.theme.colors[props.color]};
`;
const Labelizer = styled(Box)`
	padding: 0;
	padding-bottom: 8px;
	position: relative;
	top: -5px;
	cursor: pointer;
`;

function AddSection({props}) {
	return (
		<Flex
			flexDirection={'row'}
			justifyContent={'flex-start'}
			alignItems={'baseline'}
		>
			<IconSized color={'primary'}>
				<i className={'material-icons'}>add_circle_outline</i>
			</IconSized>
			<Labelizer>
				<Text color={'primary'}>Добавить подраздел</Text>
			</Labelizer>
		</Flex>
	);
}

export default AddSection;
