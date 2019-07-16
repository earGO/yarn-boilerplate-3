import {success, error} from 'redux-saga-requests'

import * as types from './types'

export const initialState = {
	selectedOption: ''
}

export default {
	[types.PRESELECT_OPTION]: (_, {payload}) => {
		const options = payload.options
		const selectedOption = payload.selectedOption
		if (selectedOption === '') {
			return {
				selectedOption: options[0].id
			}
		} else {
			return {
				selectedOption: selectedOption
			}
		}
	},
	[types.SELECT_OPTION]: (_, {payload}) => ({
		selectedOption: payload.selectedOption
	})
}
