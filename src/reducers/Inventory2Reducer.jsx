import update from 'immutability-helper'

export const START_ADJUSTMENT = 'REQUEST_INVENTORY'
export const ADJUSTMENT_SUCCESS = 'REQUEST_INVENTORY_SUCCESS'
export const ADJUSTMENT_FAILURE = 'REQUEST_INVENTORY_FAILURE'
export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const HISTORY_SUCCESS = 'HISTORY_SUCCESS'
export const HISTORY_FAILURE = 'HISTORY_FAILURE'

export function _inventory2(state, action) {
	switch(action.type) {
		case START_ADJUSTMENT:
			startAdjustment(state, action)
			break
		case ADJUSTMENT_SUCCESS:
			adjustmentSuccess(state, action)
			break
		case ADJUSTMENT_FAILURE:
			adjustmentFailure(state, action)
			break
		case REQUEST_HISTORY:
			requestHistory(state, action)
			break
		case HISTORY_SUCCESS:
			historySuccess(state, action)
			break
		case HISTORY_FAILURE:
			historyFailure(state, action)
			break
		default:
			return state
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
	let index = getIndexOfInventory(action.process_type, action.product_type)
	return update(state, {
		ui: {
			$merge: { isFetchingHistory: false }
		},
		data: {
			[index]: {
				$merge: { history: action.history }
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