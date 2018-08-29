import update from 'immutability-helper'
import { updateRanksToMatchOrder } from '../utilities/processutils'

export const START_ADDING_ATTRIBUTE = 'START_ADDING_ATTRIBUTE'
export const FINISH_ADDING_ATTRIBUTE = 'FINISH_ADDING_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE = 'REQUEST_SAVE_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE_SUCCESS = 'REQUEST_SAVE_ATTRIBUTE_SUCCESS'
export const REQUEST_SAVE_ATTRIBUTE_FAILURE = 'REQUEST_SAVE_ATTRIBUTE_FAILURE'
export const REQUEST_ARCHIVE_ATTRIBUTE = 'REQUEST_ARCHIVE_ATTRIBUTE'
export const REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS = 'REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS'
export const REQUEST_ARCHIVE_ATTRIBUTE_FAILURE = 'REQUEST_ARCHIVE_ATTRIBUTE_FAILURE'
export const REQUEST_MOVE_ATTRIBUTE = 'REQUEST_MOVE_ATTRIBUTE'
export const REQUEST_MOVE_ATTRIBUTE_SUCCESS = 'REQUEST_MOVE_ATTRIBUTE_SUCCESS'
export const REQUEST_MOVE_ATTRIBUTE_FAILURE = 'REQUEST_MOVE_ATTRIBUTE_FAILURE'
export const REQUEST_UPDATE_ATTRIBUTE = 'REQUEST_UPDATE_ATTRIBUTE'
export const REQUEST_UPDATE_ATTRIBUTE_SUCCESS = 'REQUEST_UPDATE_ATTRIBUTE_SUCCESS'
export const REQUEST_UPDATE_ATTRIBUTE_FAILURE = 'REQUEST_UPDATE_ATTRIBUTE_FAILURE'
export const SELECT_ATTRIBUTE = 'SELECT_ATTRIBUTE'
export const REQUEST_ATTRIBUTE_DETAILS = 'REQUEST_ATTRIBUTE_DETAILS'
export const REQUEST_ATTRIBUTE_DETAILS_SUCCESS = 'REQUEST_ATTRIBUTE_DETAILS_SUCCESS'

export function _processAttribute(state, action) {
	switch(action.type) {
		case START_ADDING_ATTRIBUTE:
			return startAddingAttribute(state, action)
		case FINISH_ADDING_ATTRIBUTE:
			return finishAddingAttribute(state, action)
		case REQUEST_SAVE_ATTRIBUTE:
			return requestSaveAttribute(state, action)
		case REQUEST_SAVE_ATTRIBUTE_SUCCESS:
			return requestSaveAttributeSuccess(state, action)
		case REQUEST_SAVE_ATTRIBUTE_FAILURE:
			return requestSaveAttributeFailure(state, action)
		case REQUEST_ARCHIVE_ATTRIBUTE:
			return requestArchiveAttribute(state, action)
		case REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS:
			return requestArchiveAttributeSuccess(state, action)
		case REQUEST_ARCHIVE_ATTRIBUTE_FAILURE:
			return requestArchiveAttributeFailure(state, action)
		case REQUEST_MOVE_ATTRIBUTE:
			return requestMoveAttribute(state, action)
		case REQUEST_MOVE_ATTRIBUTE_SUCCESS:
			return requestMoveAttributeSuccess(state, action)
		case REQUEST_MOVE_ATTRIBUTE_FAILURE:
			return requestMoveAttributeFailure(state, action)
		case REQUEST_UPDATE_ATTRIBUTE_SUCCESS:
			return requestUpdateAttributeSuccess(state, action)
		case SELECT_ATTRIBUTE:
			return selectAttribute(state, action)
		case REQUEST_ATTRIBUTE_DETAILS:
			return requestAttributeDetails(state, action)
		case REQUEST_ATTRIBUTE_DETAILS_SUCCESS:
			return requestAttributeDetailsSuccess(state, action)
		default:
			return state
	}
}

// function requestUpdateAttribute(state, action) {
// 	let index = state.data[action.process].attributes.findIndex((e) => e.id === action.id)
// 	return update(state, {
// 		ui: {
// 			$merge: { 
// 				isUpdatingAttribute: true 
// 			}
// 		}
// 	})
// }

function requestUpdateAttributeSuccess(state, action) {
	let index = state.data[action.process].attributes.findIndex((e) => e.id === action.id)
	return update(state, {
		data: {
			[action.process]: {
				attributes: {
					[index]: { 
						$merge: action.attribute_updates
					}
				}
			}
		}, ui: {
			$merge: {
				isUpdatingAttribute: false
			}
		}
	})
}

function startAddingAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: { 
				isAddingAttribute: true,
				selectedAttribute: -1, 
			}
		}
	})
}

function finishAddingAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: {
				isSavingAttribute: false,
				isAddingAttribute: false,
			}
		}
	})
}

function requestSaveAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: {
				isSavingAttribute: true
			}
		}
	})
}

function requestSaveAttributeSuccess(state, action) {
	let ns = update(state, {
		data: {
			[action.process]: {
				attributes: {
					$push: [action.attribute]
				}
			}
		}
	})

	// if we've moved on by now don't upset the isSaving stuff 
	if (state.ui.selectedItem !== action.process)
		return ns

	return update(ns, {
		ui: {
			$merge: {isSavingAttribute: false,}
		}
	})
}

function requestSaveAttributeFailure(state, action) {
	console.error("failed to save the attribute")
	if (state.ui.selectedItem !== action.process)
		return state

	return update(state, {
		ui: {
			$merge: {
				isSavingAttribute: false,
			}
		}
	})
}

function requestArchiveAttribute(state, action) {
	const ns = update(state, {
		data: {
			[action.process_index]: {
				attributes: {
					$splice: [[action.attribute_index, 1]]
				}
			}
		}
	})

	updateRanksToMatchOrder(ns.data[action.process_index].attributes)

	return ns
}

function requestArchiveAttributeSuccess(state, action) {
	return state
}

function requestArchiveAttributeFailure(state, action) {
	return update(state, {
		data: {
			[action.process_index]: {
				attributes: {
					$splice: [[action.attribute_index, 0, action.oldAttribute]]
				}
			}
		}
	})
}

function requestMoveAttribute(state, action) {
	return update(state, {
		ui: {
			isMovingAttribute: {$set: true}
		}
	})
}

function requestMoveAttributeSuccess(state, action) {
	let attrs = state.data[action.process_index].attributes
	let old_rank = attrs.findIndex((e) => e.id === action.id)
	let attr = attrs[old_rank]
	
	// actually reorder the attributes array 
	let ns =  update(state, {
		data: {
			[action.process_index]: {
				attributes: {
					$splice: [[old_rank, 1], [action.new_rank, 0, attr]]
				}
			}
		},
		ui: {
			isMovingAttribute: {$set: false}
		}
	})

	updateRanksToMatchOrder(ns.data[action.process_index].attributes)

	// return 
	return ns
}

function requestMoveAttributeFailure(state, action) {
	return update(state, {
		ui: {
			isMovingAttribute: {$set: false}
		}
	})
}

function selectAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: { selectedAttribute: action.id }
		}
	})
}

function requestAttributeDetails(state, action) {
	return update(state, {
		ui: {
			$merge: { isFetchingAttributeDetails: true }
		}
	})
}

function requestAttributeDetailsSuccess(state, action) {
	let attrs = state.data[action.process].attributes
	let index = attrs.findIndex((e) => e.id === action.id)
	return update(state, {
		ui: {
			$merge: { isFetchingAttributeDetails: false }
		}, 
		data: {
			[action.process]: {
				attributes: {
					[index]: {
						$merge: action.details,
					}
				}
			}
		}
	})
}