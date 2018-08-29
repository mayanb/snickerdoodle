import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'

export const REQUEST_IN_PROGRESS_INVENTORY = 'REQUEST_IN_PROGRESS_INVENTORY'
export const REQUEST_IN_PROGRESS_INVENTORY_SUCCESS = 'REQUEST_IN_PROGRESS_INVENTORY_SUCCESS'
export const REQUEST_IN_PROGRESS_INVENTORY_FAILURE = 'REQUEST_IN_PROGRESS_INVENTORY_FAILURE'
export const REQUEST_REMAINING_RAW_MATERIALS = 'REQUEST_REMAINING_RAW_MATERIALS'
export const REQUEST_REMAINING_RAW_MATERIALS_SUCCESS = 'REQUEST_REMAINING_RAW_MATERIALS_SUCCESS'
export const REQUEST_REMAINING_RAW_MATERIALS_FAILURE = 'REQUEST_REMAINING_RAW_MATERIALS_FAILURE'

export function _productionPlanning(state, action) {
	let ns = apiDataReducer(state, action)
	switch (action.type) {
		case REQUEST_IN_PROGRESS_INVENTORY:
			return inProgressInventory(state, action)
		case REQUEST_IN_PROGRESS_INVENTORY_SUCCESS:
			return inProgressInventorySuccess(state, action)
		case REQUEST_IN_PROGRESS_INVENTORY_FAILURE:
            return inProgressInventoryFailure(state, action)
        case REQUEST_REMAINING_RAW_MATERIALS:
			return remainingRawMaterials(state, action)
		case REQUEST_REMAINING_RAW_MATERIALS_SUCCESS:
			return remainingRawMaterialsSuccess(state, action)
		case REQUEST_REMAINING_RAW_MATERIALS_FAILURE:
			return remainingRawMaterialsFailure(state, action)
		default:
			return ns
	}
}

function inProgressInventory(state/*, action*/) {
	return update(state, {
		ui: {
			$merge: { isFetchingInProgress: true }
		}
	})
}

function inProgressInventorySuccess(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingInProgress: false }
		},
		data: {
            $merge: {
                inProgress: action.data
            }
		}
	})
}

function inProgressInventoryFailure(state/*, action*/) {
	return update(state, {
		ui: {
			$merge: { isFetchingInProgress: false }
		}
	})
}

function remainingRawMaterials(state/*, action*/) {
	return update(state, {
		ui: {
			$merge: { isFetchingRawMaterials: true }
		}
	})
}

function remainingRawMaterialsSuccess(state, action) {
    // Convert date_exhaused to a js Date object
    const newData = []
    action.data.forEach(item => {
        newData.push({...item, date_exhausted: new Date(item.date_exhausted)})
	})
	return update(state, {
		ui: {
			$merge: { isFetchingRawMaterials: false }
		},
		data: {
            $merge: {
                rawMaterials: newData
            }
		}
	})
}

function remainingRawMaterialsFailure(state/*, action*/) {
	return update(state, {
		ui: {
			$merge: { isFetchingRawMaterials: false }
		}
	})
}

