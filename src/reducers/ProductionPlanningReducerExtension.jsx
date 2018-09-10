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

function productionPlanning(state, action) {
	return update(state, {
		ui: {
			$merge: { 
				isFetchingData: true,
				timestamp: action.timestamp
			}
		}
	})
}

function productionPlanningSuccess(state, action) {
	const { data, ordering, timestamp } = action

	const rawMaterials = []
	const inProgress = []
	data.forEach(item => {
		if (item.process_type.category === 'rm') {
			// Converts date string to Date object
			const date_exhausted = item.date_exhausted ? new Date(item.date_exhausted) : null
			rawMaterials.push({ ...item, date_exhausted })
			inProgress.push(item)
		}
		if (item.process_type.category === 'wip') {
			inProgress.push(item)
		}
	})

	if (ordering === 'process_type.name') {
		inProgress.sort((a, b) => {
			const a_is_rm = a.process_type.category === 'rm',
				  b_is_rm = b.process_type.category === 'rm'
			return (b.warning && b_is_rm) - (a.warning && a_is_rm) ||
				b_is_rm - a_is_rm ||
				a.process_type.name.localeCompare(b.process_type.name)
		})
	}
	if (actionIsValid(state, timestamp)) {
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
	return state
}

function productionPlanningFailure(state, action) {
	if (actionIsValid(state, action.timestamp)) {
		return update(state, {
			ui: {
				$merge: { isFetchingData: false }
			}
		})
	}
	return state
}

function actionIsValid(state, timestamp) {
    return timestamp >= state.ui.timestamp;
}