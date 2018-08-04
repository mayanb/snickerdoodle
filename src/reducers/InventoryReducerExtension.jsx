import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'

export const START_ADJUSTMENT = 'REQUEST_INVENTORY'
export const ADJUSTMENT_SUCCESS = 'REQUEST_INVENTORY_SUCCESS'
export const ADJUSTMENT_FAILURE = 'REQUEST_INVENTORY_FAILURE'
export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const REQUEST_HISTORY_SUCCESS = 'HISTORY_SUCCESS'
export const REQUEST_HISTORY_FAILURE = 'HISTORY_FAILURE'
export const REQUEST_AGGREGATE = 'REQUEST_AGGREGATE'
export const REQUEST_AGGREGATE_SUCCESS = 'REQUEST_AGGREGATE_SUCCESS'
export const REQUEST_AGGREGATE_FAILURE = 'REQUEST_AGGREGATE_FAILURE'

export function _inventory(state, action) {
	let ns = apiDataReducer(state, action)
	switch (action.type) {
		case START_ADJUSTMENT:
			return startAdjustment(state, action)
		case ADJUSTMENT_SUCCESS:
			return adjustmentSuccess(state, action)
		case ADJUSTMENT_FAILURE:
			return adjustmentFailure(state, action)
		case REQUEST_HISTORY:
			return requestHistory(state, action)
		case REQUEST_HISTORY_SUCCESS:
			return historySuccess(state, action)
		case REQUEST_HISTORY_FAILURE:
			return historyFailure(state, action)
		case REQUEST_AGGREGATE:
			return requestAggregate(state, action)
		case REQUEST_AGGREGATE_SUCCESS:
			return requestAggregateSuccess(state, action)
		case REQUEST_AGGREGATE_FAILURE:
			return requestAggregateFailure(state, action)
		default:
			return ns
	}
}

function getIndexOfInventory(state, proc, prod) {
	return state.data.findIndex(e => {
		return (parseInt(proc, 10) === parseInt(e.process_type.id, 10) &&
			parseInt(prod, 10) === parseInt(e.product_types[0].id, 10)
		)
	})
}

// TODO - have no idea if these work or not

function startAdjustment(state, action) {
	return update(state, {
		ui: {
			$merge: { isAdjusting: true }
		}
	})
}

function adjustmentSuccess(state, action) {
	let index = getIndexOfInventory(state, action.process_type, action.product_type)
	return update(state, {
		ui: {
			$merge: { isAdjusting: false }
		},
		data: {
			[index]: {
				$merge: { amount: action.amount }
			}
		}
	})
}

function adjustmentFailure(state, action) {
	return update(state, {
		ui: {
			$merge: { isAdjusting: false }
		}
	})
}

function requestHistory(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingHistory: true }
		}
	})
}

function historySuccess(state, action) {
	let index = getIndexOfInventory(state, action.processId, action.productId)
	const annotatedHistory = annotateHistory(action.data)
	const { endAmount, cost } = annotatedHistory[0].data
	return update(state, {
		ui: {
			$merge: { isFetchingHistory: false }
		},
		data: {
			[index]: {
				$merge: {
					history: annotatedHistory,
					adjusted_amount: endAmount,
					adjusted_cost: cost ? cost : state.data[index].adjusted_cost
				}
			}
		}
	})
}

function historyFailure(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingHistory: false }
		}
	})
}

function annotateHistory(data) {
	let startDate = new Date(1, 0, 1)
	let startAmount = 0
	let annotatedHistory = data.slice().reverse()
		//Exclude item summaries with zero created or used amounts
		.filter(item => item.type === 'adjustment' || item.data.created_amount > 0 || item.data.used_amount > 0)

	annotatedHistory.forEach(item => {
		item.data.startDate = startDate
		item.data.startAmount = startAmount
		item.data.endDate = item.date
		item.data.endAmount = item.type === 'adjustment' ? item.data.amount : startAmount + item.data.created_amount - item.data.used_amount

		startDate = item.data.endDate
		startAmount = item.data.endAmount
	})
	return annotatedHistory.reverse()
}

function aggregateActionIsValid(state, data) {
    return data.timestamp >= state.ui.aggregateDataTimestamp;
}

function requestAggregate(state, action) {
	return update(state, {
		ui: {
			$merge: { 
				isFetchingAggregateData: true,
				aggregateDataTimestamp: action.timestamp,
			}
		}
	})
}

function requestAggregateSuccess(state, action) {
	const { data } = action
	if (aggregateActionIsValid(state, action)) {
		return update(state, {
			ui: {
				$merge: { isFetchingAggregateData: false }
			},
			aggregateData: { $set: data }
		})
	}
	return state
}

function requestAggregateFailure(state, action) {
	if (aggregateActionIsValid(state, action)) {
		return update(state, {
			ui: {
				$merge: { isFetchingAggregateData: false }
			}
		})
	}
	return state
}