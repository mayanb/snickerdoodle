import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'

export const START_ADJUSTMENT = 'REQUEST_INVENTORY'
export const ADJUSTMENT_SUCCESS = 'REQUEST_INVENTORY_SUCCESS'
export const ADJUSTMENT_FAILURE = 'REQUEST_INVENTORY_FAILURE'
export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const REQUEST_HISTORY_SUCCESS = 'HISTORY_SUCCESS'
export const REQUEST_HISTORY_FAILURE = 'HISTORY_FAILURE'

export function _inventory2(state, action) {
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
		default:
			return ns
	}
}

function getIndexOfInventory(state, proc, prod) {
	return state.data.findIndex(e => {
		return (parseInt(proc, 10) === parseInt(e.process_id, 10) &&
			parseInt(prod, 10) === parseInt(e.product_id, 10)
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
	let index = getIndexOfInventory(action.process_type, action.product_type)
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
		$merge: { isAdjusting: false }
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
	console.log("action", action)
	let index = getIndexOfInventory(state, action.processId, action.productId)
	console.log('index', index)
	return update(state, {
		ui: {
			$merge: { isFetchingHistory: false }
		},
		data: {
			[index]: {
				$merge: { history: action.data }
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