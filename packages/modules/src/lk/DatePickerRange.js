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
import {Box} from '@ursip/design-system';
import 'moment/locale/ru';
import TestCustomArrowIcon from './TestCustomArrowIcon';
import Icon from '@project/components/src/Icon/Icon';
// https://github.com/airbnb/react-dates/blob/master/src/theme/DefaultTheme.js

// Хз как сюда динамически запихнуть переменные из темы.
// Наверное, стоит убрать этот react-with-styles и старым добрым оверрайдом ксс застайлить.
// Допустим, добавить размер large - без цирковых представлений не обойдется.
// #TODO.
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

// Проставим локаль.

moment.locale('ru');
// Ta-da!

// Теперь у нас отст<s>тойный</s>айленный датапикер.

// TBD - подумать.
const Wrapper = styled(Box)`
	input:hover:not(:focus) {
		border: 1px solid #3a3a3a !important;
		background: #ffffff !important;
	}
	input:not(:focus) {
		background: #f5f5f5 !important;
	}
	& > .[class*='_arrow'] {
		display: none;!important;
	}
`;

/** Используется для получение данных типа "Дата" от пользователя.*/

function Datepicker(props) {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState(false);
	const {value, onChange, ...rest} = props;
	return (
		<Wrapper id={'daypickerWrapper'}>
			<div onClick={() => setFocusedInput('startDate')}>PropClicker</div>

			<DateRangePicker
				block // 100% ширины
				{...rest}
				// Required props
				startDateId="startDate"
				endDateId="endDate"
				startDate={startDate}
				endDate={endDate}
				onDatesChange={({startDate, endDate}) => {
					setStartDate(startDate);
					setEndDate(endDate);
					if (startDate && endDate) {
						console.log(startDate._d, endDate._d);
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
				customInputIcon={<Icon name={'calendar_today'} />}
				inputIconPosition="after"
			/>
		</Wrapper>
	);
}

export default Datepicker;
