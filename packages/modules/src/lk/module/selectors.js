import {createSelector} from 'reselect';

import {namespace} from './types';
import {initialState} from './reducers';

import {lk as service} from '../../../import';

const namespaceStateSelector = state => state[namespace] || initialState;
const serviceStateSelector = state => state[service.name] || initialState;

function getProjectTitle(projectObject) {
	if (
		projectObject !== undefined &&
		projectObject.hasOwnProperty('objectName')
	) {
		const projectName = projectObject.objectName;
		const projectAdress = projectObject.addressGenerated;
		return {
			projectName: projectName,
			projectAdress: projectAdress
		};
	}
}

function getProjectId(projectObject) {
	if (
		projectObject !== undefined &&
		projectObject.hasOwnProperty('idProject')
	) {
		return {
			projectId: projectObject.idProject
		};
	}
}

export const projectsLoading = createSelector(
	namespaceStateSelector,
	state => state.projectsLoading
);

export const projectsDataSelector = createSelector(
	serviceStateSelector,
	state => state.data
);
