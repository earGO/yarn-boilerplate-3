import {createSelector} from 'reselect';

import {namespace} from './types';
import {initialState} from './reducers';

import {lk as service} from '../../../import';

const namespaceStateSelector = state => state[namespace] || initialState;
const serviceStateSelector = state => state[service.name] || initialState;

function makeArrayOfProjects(arrayOfStages) {
	let arrayOfProjects = [];
	if (arrayOfStages) {
		arrayOfStages.forEach(stage => {
			stage['projects'].forEach(project => {
				arrayOfProjects.push(project);
			});
		});
	}
	return arrayOfProjects;
}

function makearrayFlat(arrayOfProjects) {
	let flatArrayOfProjects = [];
	if (arrayOfProjects) {
		arrayOfProjects.forEach(project => {
			let flattenProject = {...project};
			let flattenFields = project.field;
			let newFields = {};
			flattenFields.forEach(field => {
				newFields[field.nick] = field.value;
			});
			delete flattenProject.field;
			let pushedProject = {...flattenProject, ...newFields};
			flatArrayOfProjects.push(pushedProject);
		});
	}
	return flatArrayOfProjects;
}

export const projectsLoading = createSelector(
	namespaceStateSelector,
	state => state.projectsLoading
);

export const projectsDataSelector = createSelector(
	serviceStateSelector,
	state => state.data
);

export const projectsArraySelector = createSelector(
	projectsDataSelector,
	state => makeArrayOfProjects(state)
);

export const projectsFlattenArraySelector = createSelector(
	projectsArraySelector,
	state => makearrayFlat(state)
);
