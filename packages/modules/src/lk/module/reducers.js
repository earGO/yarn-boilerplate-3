import {success, error} from 'redux-saga-requests';

import {lk as service} from '../../../import';

const serviceTypes = service.types;

export const initialState = {
	projectsLoading: false
};

export default {
	[serviceTypes.LOAD_PROJECT]: () => ({
		projectsLoading: true
	}),
	[success(serviceTypes.LOAD_PROJECT)]: () => ({
		projectsLoading: false
	}),
	[error(serviceTypes.LOAD_PROJECT)]: () => ({
		projectsLoading: false
	})
};
