import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'

export const REQUEST_PRODUCTION_PLANNING = 'REQUEST_PRODUCTION_PLANNING'
export const REQUEST_PRODUCTION_PLANNING_SUCCESS = 'REQUEST_PRODUCTION_PLANNING_SUCCESS'
export const REQUEST_PRODUCTION_PLANNING_FAILURE = 'REQUEST_PRODUCTION_PLANNING_FAILURE'

export function _productionPlanning(state, action) {
	let ns = apiDataReducer(state, action)
	switch (action.type) {
		case REQUEST_PRODUCTION_PLANNING:
			return productionPlanning(state, action)
		case REQUEST_PRODUCTION_PLANNING_SUCCESS:
			return productionPlanningSuccess(state, action)
		case REQUEST_PRODUCTION_PLANNING_FAILURE:
			return productionPlanningFailure(state, action)
		default:
			return ns
	}
}

function productionPlanning(state/*, action*/) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: true }
		}
	})
}

function productionPlanningSuccess(state, action) {
	const { data, ordering } = action

	const rawMaterials = []
	const inProgress = []
	data.forEach(item => {
		if (item.process_type.category === 'rm') {
			// Converts date string to Date object
			rawMaterials.push({...item, date_exhausted: new Date(item.date_exhausted)})
			inProgress.push(item)
		}
		if (item.process_type.category === 'wip') {
			inProgress.push(item)
		}
	})

	if (ordering === 'process_type.name') {
		inProgress.sort((a, b) => {
			if (a.process_type.name < b.process_type.name)
				return -1
			if (a.process_type.name > b.process_type.name)
				return 1
			return 0
		})
	}

	return update(state, {
		ui: {
			$merge: { isFetchingData: false }
		},
		data: {
            $merge: {
				rawMaterials: rawMaterials,
				inProgress: inProgress,
            }
		}
	})
}

function productionPlanningFailure(state/*, action*/) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: false }
		}
	})
}