import update from 'immutability-helper'

export const REQUEST_SAVE_ATTRIBUTE = 'REQUEST_SAVE_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE_SUCCESS = 'REQUEST_SAVE_ATTRIBUTE_SUCCESS'
export const REQUEST_SAVE_ATTRIBUTE_FAILURE = 'REQUEST_SAVE_ATTRIBUTE_FAILURE'

export function _taskAttribute(state, action) {
	switch (action.type) {
		case REQUEST_SAVE_ATTRIBUTE:
			return requestSaveAttribute(state, action)
		case REQUEST_SAVE_ATTRIBUTE_SUCCESS:
			return requestSaveAttributeSuccess(state, action)
		case REQUEST_SAVE_ATTRIBUTE_FAILURE:
			return requestSaveAttributeFailure(state, action)
		default:
			return state
	}
}

function requestSaveAttribute(state, action) {
	return update(state, {
		ui: {
			$merge: { isSavingAttribute: true }
		}
	})
}

function requestSaveAttributeSuccess(state, action) {
	return update(state, {
		data: {
			attributesWithValues: {
				[action.index]: {
					$merge: { value: action.params.value }
				}
			}
		},
		ui: {
			$merge: { isSavingAttribute: false }
		}
	})
}

function requestSaveAttributeFailure(state, action) {
	return update(state, {
		ui: {
			$merge: { isSavingAttribute: false }
		}
	})
}



