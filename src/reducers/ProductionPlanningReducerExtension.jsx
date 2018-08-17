import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'

export const REQUEST_ANCESTORS_INVENTORY = 'REQUEST_ANCESTORS_INVENTORY'
export const REQUEST_ANCESTORS_INVENTORY_SUCCESS = 'REQUEST_ANCESTORS_INVENTORY_SUCCESS'
export const REQUEST_ANCESTORS_INVENTORY_FAILURE = 'REQUEST_ANCESTORS_INVENTORY_FAILURE'
export const REQUEST_REMAINING_INVENTORY = 'REQUEST_REMAINING_INVENTORY'
export const REQUEST_REMAINING_INVENTORY_SUCCESS = 'REQUEST_REMAINING_INVENTORY_SUCCESS'
export const REQUEST_REMAINING_INVENTORY_FAILURE = 'REQUEST_REMAINING_INVENTORY_FAILURE'

export function _productionPlanning(state, action) {
	let ns = apiDataReducer(state, action)
	switch (action.type) {
		case REQUEST_ANCESTORS_INVENTORY:
			return ancestorsInventory(state, action)
		case REQUEST_ANCESTORS_INVENTORY_SUCCESS:
			return ancestorsInventorySuccess(state, action)
		case REQUEST_ANCESTORS_INVENTORY_FAILURE:
            return ancestorsInventoryFailure(state, action)
        case REQUEST_REMAINING_INVENTORY:
			return remainingInventory(state, action)
		case REQUEST_REMAINING_INVENTORY_SUCCESS:
			return remainingInventorySuccess(state, action)
		case REQUEST_REMAINING_INVENTORY_FAILURE:
			return remainingInventoryFailure(state, action)
		default:
			return ns
	}
}

function ancestorsInventory(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: true }
		}
	})
}

function ancestorsInventorySuccess(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: false }
		},
		data: {
            $merge: {
                [action.category]: action.data
            }
		}
	})
}

function ancestorsInventoryFailure(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: false }
		}
	})
}

function remainingInventory(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: true }
		}
	})
}

function remainingInventorySuccess(state, action) {
    // Convert date_exhaused to a js Date object
    const newData = []
    action.data.forEach(item => {
        newData.push({...item, date_exhausted: new Date(item.date_exhausted)})
    })
	return update(state, {
		ui: {
			$merge: { isFetchingData: false }
		},
		data: {
            $merge: {
                [action.category]: newData
            }
		}
	})
}

function remainingInventoryFailure(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingData: false }
		}
	})
}

