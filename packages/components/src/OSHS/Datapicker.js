// THEMING IS HARD WITH THIS ONE.
// Сначала - темы.
import produce from 'immer'
import moment from 'moment'
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet'
import aphroditeInterface from 'react-with-styles-interface-aphrodite'
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme'
import 'moment/locale/ru'

import {Box} from '../../import'

import React, {Component} from 'react'
import styled from 'styled-components'
import {SingleDatePicker} from 'react-dates'

// https://github.com/airbnb/react-dates/blob/master/src/theme/DefaultTheme.js

// Хз как сюда динамически запихнуть переменные из темы.
// Наверное, стоит убрать этот react-with-styles и старым добрым оверрайдом ксс застайлить.
// Допустим, добавить размер large - без цирковых представлений не обойдется.
// #TODO.
ThemedStyleSheet.registerInterface(aphroditeInterface)
const DesignSystemTheme = produce(DefaultTheme, draft => {
	const {input, pickerInput} = draft.reactDates.border
	input.border = '1px solid transparent'
	input.borderTop = '1px solid transparent'
	input.borderBottom = '1px solid transparent'
	input.borderLeft = '1px solid transparent'
	input.borderRight = '1px solid transparent'
	input.borderTopFocused = '1px solid #0091ea'
	input.borderLeftFocused = '1px solid #0091ea'
	input.borderBottomFocused = '1px solid #0091ea'
	input.borderRightFocused = '1px solid #0091ea'
	input.borderRadius = 4
	pickerInput.borderRadius = 4
	// Цвета:
	const {color} = draft.reactDates
	color.background = '#ffffff'
	color.backgroundFocused = '#ffffff'
	color.border = 'transparent'
	color.selected.backgroundColor = '#1976d2'
	color.selected.backgroundColor_hover = '#1976d2'
	color.selected.borderColor = '#1976d2'
	color.selected.borderColor_hover = '#1976d2'
	const {spacing} = draft.reactDates
	spacing.displayTextPaddingTop = 7
	spacing.displayTextPaddingBottom = 7
	spacing.displayTextPaddingLeft = 16
	spacing.displayTextPaddingRight = 8
	const {font} = draft.reactDates
	font.input.size = 14
	font.input.size_small = 14
})
ThemedStyleSheet.registerTheme(DesignSystemTheme)

// Проставим локаль.
moment.locale('ru')
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
`

/** Используется для получение данных типа "Дата" от пользователя.*/
class Datepicker extends Component {
	constructor(props) {
		super(props)
		if (!this.props.id) {
			throw new Error('id prop обязателен для компонента.')
		}
		this.state = {
			value:
				props.value === undefined
					? props.value
					: props.defaultValue || null
		}
	}

	static getDerivedStateFromProps(nextProps) {
		if ('value' in nextProps) {
			return {
				value: nextProps.value
			}
		}
		return null
	}

	handleChange = newDate => {
		this.setState({
			value: newDate
		})
		this.props.onChange && this.props.onChange(newDate)
	}

	render() {
		const {value, onChange, ...rest} = this.props
		return (
			<Wrapper>
				<SingleDatePicker
					block // 100% ширины
					// required props
					id={this.props.id}
					date={this.state.value} // momentPropTypes.momentObj or null
					onDateChange={this.handleChange} // PropTypes.func.isRequired
					focused={this.state.focused} // PropTypes.bool
					onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
					// optional - оставил пока разумные дефолты.
					// В идеале - все нужное человеку пролетит в ...rest
					hideKeyboardShortcutsPanel // убирает панель хоткеями
					regular // стандартный размер
					numberOfMonths={1} // показывать по 1 месяцу
					isOutsideRange={() => false} // дает выбрать уже прошедшие дни.
					{...rest}
				/>
			</Wrapper>
		)
	}
}

/** @component */
export default Datepicker
