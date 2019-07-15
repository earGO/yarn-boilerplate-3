import {createSelector} from 'reselect'

import {namespace} from './types'
import {initialState} from './reducers'

import {lk as service} from '../../../import'

const namespaceStateSelector = state => state[namespace] || initialState
const serviceStateSelector = state => state[service.name] || initialState

function makeArrayOfProjects(arrayOfStages) {
	let arrayOfProjects = []
	if (arrayOfStages) {
		arrayOfStages.forEach(stage => {
			const stageName = stage['stage']
			stage['projects'].forEach(project => {
				arrayOfProjects.push({...project, stageName})
			})
		})
	}
	return arrayOfProjects
}

function makeArrayFlat(arrayOfProjects) {
	let flatArrayOfProjects = []
	if (arrayOfProjects) {
		arrayOfProjects.forEach(project => {
			let flattenProject = {...project}
			let flattenFields = project.field
			let newFields = {}
			flattenFields.forEach(field => {
				newFields[field.nick] = field.value
			})
			delete flattenProject.field
			let pushedProject = {...flattenProject, ...newFields}
			flatArrayOfProjects.push(pushedProject)
		})
	}
	return flatArrayOfProjects
}

function sortArrayOnDate(flatArrayOfProjects, criteria) {
	return flatArrayOfProjects.sort(function(a, b) {
		let x = a[criteria]
		let y = b[criteria]
		if (x > y) {
			return -1
		}
		if (x < y) {
			return 1
		}
		return 0
	})
}

export const projectsLoading = createSelector(
	namespaceStateSelector,
	state => state.projectsLoading
)

export const projectsDataSelector = createSelector(
	serviceStateSelector,
	state => state.data
)

export const projectsArraySelector = createSelector(
	projectsDataSelector,
	state => makeArrayOfProjects(state)
)

export const projectsFlattenArraySelector = createSelector(
	projectsArraySelector,
	state => makeArrayFlat(state)
)

export const sortedOnCriteria = criteria =>
	createSelector(
		projectsFlattenArraySelector,
		state => sortArrayOnDate(state, criteria)
	)
