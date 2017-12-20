import update from 'immutability-helper'

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

		default:
			return state
	}
}

function requestUpdateAttributeSuccess(state, action) {
	let index = state.data[action.process].attributes.findIndex((e) => e.id == action.id)
	return update(state, {
		data: {
			[action.process]: {
				attributes: {
					[index]: { 
						$merge: action.attribute_updates
					}
				}
			}
		}
	})
}

function startAddingAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: { isAddingAttribute: true }
		}
	})
}

function finishAddingAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: {
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
	if (state.ui.selectedItem != action.process)
		return ns

	return update(ns, {
		ui: {
			$merge: {isSavingAttribute: false,}
		}
	})
}

function requestSaveAttributeFailure(state, action) {
	alert("failed to save the attribute")
	if (state.ui.selectedItem != action.process)
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
	return update(state, {
		data: {
			[action.process_index]: {
				attributes: {
					$splice: [[action.attribute_index, 1]]
				}
			}
		}
	})
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

	
	// update all the ranks to match the new order in the array
	for (var i = 0; i < ns.data[action.process_index].attributes.length; i++) {
		ns.data[action.process_index].attributes[i].rank = i
	}

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

