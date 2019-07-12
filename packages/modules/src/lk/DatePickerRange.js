// THEMING IS HARD WITH THIS ONE.
// Сначала - темы.
import produce from 'immer';
import moment from 'moment';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import React, {useState} from 'react';
import styled from 'styled-components';
import {DateRangePicker} from 'react-dates';
import {Box, Flex, Text} from '@ursip/design-system';
import 'moment/locale/ru';
import TestCustomArrowIcon from './TestCustomArrowIcon';
import Icon from '@project/components/src/Icon/Icon';
// https://github.com/airbnb/react-dates/blob/master/src/theme/DefaultTheme.js

/* Since air-bnb datepicker is awesome as hell, but won't give you much control
 * on it's styles on a dates widget itself, I'll use overlaying component
 * to hide original styles and to have full control over a widget display
 * in user interface */

ThemedStyleSheet.registerInterface(aphroditeInterface);
const DesignSystemTheme = produce(DefaultTheme, draft => {
	const {input, pickerInput} = draft.reactDates.border;
	input.border = '1px solid transparent';
	input.borderTop = '1px solid transparent';
	input.borderBottom = '1px solid transparent';
	input.borderLeft = '1px solid transparent';
	input.borderRight = '1px solid transparent';
	input.borderTopFocused = '1px solid #0091ea';
	input.borderLeftFocused = '1px solid #0091ea';
	input.borderBottomFocused = '1px solid #0091ea';
	input.borderRightFocused = '1px solid #0091ea';
	input.borderRadius = 4;
	pickerInput.borderRadius = 4;
	// Цвета:
	const {color} = draft.reactDates;
	color.background = '#ffffff';
	color.backgroundFocused = '#ffffff';
	color.border = 'transparent';
	color.selected.backgroundColor = '#1976d2';
	color.selected.backgroundColor_hover = '#1976d2';
	color.selected.borderColor = '#1976d2';
	color.selected.borderColor_hover = '#1976d2';
	const {spacing} = draft.reactDates;
	spacing.displayTextPaddingTop = 7;
	spacing.displayTextPaddingBottom = 7;
	spacing.displayTextPaddingLeft = 16;
	spacing.displayTextPaddingRight = 8;
	const {font} = draft.reactDates;
	font.input.size = 14;
	font.input.size_small = 14;
});
ThemedStyleSheet.registerTheme(DesignSystemTheme);

// Проставим локаль чтобы календарь был на руском.

moment.locale('ru');

// Here's a wrapper to control styles of a widget
const Wrapper = styled(Box)`
	input:hover:not(:focus) {
		border: 1px solid #3a3a3a !important;
		background: #ffffff !important;
	}
	input:not(:focus) {
		background: #f5f5f5 !important;
	}
`;

// And here-s the overlaying component styles
const Overlay = styled(Flex)`
	cursor: pointer;
	width: 216px;
	height: 42px;
	border-radius: 4px;
	background-color: #f5f5f5;
	z-index: 2;
	position: absolute;
	top: -1px;
	&:hover:not(:focus) {
		border: 1px solid #3a3a3a !important;
	}
	&:not(:focus) {
		background: #f5f5f5 !important;
	}
`;

/* The Icon component imported with some STRANGE bounding box
 * And it was unchangeable (this doesn't happens
 * in DesighSystem docs and in storybook btw - so here goes positioner box */
const OverlayIconBox = styled(Flex)`
	width: 28px;
	position: absolute;
	left: -36px;
	top: 8px;
`;
const OverlayMeasure = styled(Box)`
	border: 1px solid green;
	width: 14px;
	height: 12px;
	position: absolute;
	bottom: 0;
	right: 0;
`;
/* A wrapper for presise date message positioning */
const OverlayDates = styled(Box)`
	position: absolute;
	top: 12px;
	left: 16px;
`;

/* A function to format moment() object to needed string format */
const formatDate = momentDate => {
	let d = momentDate.toDate();
	return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
		.map(n => (n < 10 ? `0${n}` : `${n}`))
		.join('/');
};

/** Используется для получение данных типа "Дата" от пользователя.*/

function Datepicker(props) {
	/* Three variables to get data from calendar and to capture click/focus events on
	 * overlaying compinent and send them to datePicker component. */
	const [stateStartDate, setStartDate] = useState(null);
	const [stateEndDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState(null);
	const {value, onChange, ...rest} = props;
	return (
		<Wrapper>
			<Overlay onClick={() => setFocusedInput('startDate')}>
				<OverlayDates>
					{stateStartDate && stateEndDate ? (
						<Text fontSize={'12px'}>
							{formatDate(stateStartDate)} -{' '}
							{formatDate(stateEndDate)}
						</Text>
					) : (
						<Text fontSize={`12px`}>дд/мм/гггг</Text>
					)}
				</OverlayDates>
				<OverlayIconBox>
					<Icon name={'calendar_today'} />
				</OverlayIconBox>
			</Overlay>
			<DateRangePicker
				block // 100% ширины
				{...rest}
				// Required props
				startDateId="startDate"
				endDateId="endDate"
				startDate={stateStartDate}
				endDate={stateEndDate}
				onDatesChange={({startDate, endDate}) => {
					setStartDate(startDate);
					setEndDate(endDate);
					if (stateStartDate && stateEndDate) {
						console.log(stateStartDate, typeof stateEndDate);
					}
				}}
				focusedInput={focusedInput}
				onFocusChange={focusedInput => {
					setFocusedInput(focusedInput);
				}}
				// Other props
				hideKeyboardShortcutsPanel
				small
				customArrowIcon={<TestCustomArrowIcon />}
			/>
		</Wrapper>
	);
}

export default Datepicker;
