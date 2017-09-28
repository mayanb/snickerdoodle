import update from 'immutability-helper'

export const START_ADDING_ATTRIBUTE = 'START_ADDING_ATTRIBUTE'
export const FINISH_ADDING_ATTRIBUTE = 'FINISH_ADDING_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE = 'REQUEST_SAVE_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE_SUCCESS = 'REQUEST_SAVE_ATTRIBUTE_SUCCESS'
export const REQUEST_SAVE_ATTRIBUTE_FAILURE = 'REQUEST_SAVE_ATTRIBUTE_FAILURE'
export const REQUEST_ARCHIVE_ATTRIBUTE = 'REQUEST_ARCHIVE_ATTRIBUTE'
export const REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS = 'REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS'
export const REQUEST_ARCHIVE_ATTRIBUTE_FAILURE = 'REQUEST_ARCHIVE_ATTRIBUTE_FAILURE'


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
		default:
			return state
	}
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


