import update from 'immutability-helper'

export const REQUEST_INVENTORY = 'REQUEST_INVENTORY'
export const REQUEST_INVENTORY_SUCCESS = 'REQUEST_INVENTORY_SUCCESS'
export const REQUEST_INVENTORY_FAILURE = 'REQUEST_INVENTORY_FAILURE'
export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const REQUEST_ITEMS_SUCCESS = 'REQUEST_ITEMS_SUCCESS'
export const REQUEST_ITEMS_FAILURE = 'REQUEST_ITEMS_FAILURE'

export function _inventory(state, action) {

	switch(action.type) {
		case REQUEST_INVENTORY:
			return request(state, action)
		case REQUEST_INVENTORY_SUCCESS:
			return requestSuccess(state, action)
		case REQUEST_INVENTORY_FAILURE:
			return requestFailure(state, action)

		case REQUEST_ITEMS:
			return requestItems(state, action)
		case REQUEST_ITEMS_SUCCESS:
			return requestItemsSuccess(state, action)
		case REQUEST_ITEMS_FAILURE:
			return requestItemsFailure(state, action)
		default:
			return state
	}
}

function request(state, action) {
	return update(state, {
		ui: {
			isFetchingData: {
				$set: true
			}
		}
	})
}

function requestSuccess(state, action) {
	const inventoryIdHash = action.data.reduce((result, item) => {
		result[item.process_id] = item
		if(state.data[item.process_id]) {
			result[item.process_id].tasks = state.data[item.process_id].tasks
		}
		return result
	}, {})

	return update(state, {
		ui: {
			$merge: {
				isFetchingData: false,
			}
		},
		data: {
			$merge: inventoryIdHash
		}
	})
}

function requestFailure(state, action) {
	return update(state, {
		ui: {
			$merge: {
				isFetchingData: false,
				error: action.error
			}
		},
	})
}

function requestItems(state, action) {
	return update(state, {
		ui: {
			isFetchingItemsData: {
				$set: true
			}
		}
	})
}

function requestItemsSuccess(state, action) {
	const inventory = state.data[action.processId] || {}
	inventory.tasks = action.data.results
	return update(state, {
		ui: {
			$merge: {
				isFetchingItemsData: false,
			}
		},
		data: {
			$merge: {
				[action.processId]: inventory
			}
		}
	})
}

function requestItemsFailure(state, action) {
	return update(state, {
		ui: {
			$merge: {
				isFetchingItemsData: false,
				error: action.error
			}
		}
	})
}
