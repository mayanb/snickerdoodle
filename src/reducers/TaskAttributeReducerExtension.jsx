import update from 'immutability-helper'

export const REQUEST_SAVE_ATTRIBUTE = 'REQUEST_SAVE_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE_SUCCESS = 'REQUEST_SAVE_ATTRIBUTE_SUCCESS'
export const REQUEST_SAVE_ATTRIBUTE_FAILURE = 'REQUEST_SAVE_ATTRIBUTE_FAILURE'

export function _taskAttribute(state, action) {
	switch (action.type) {
    case REQUEST_SAVE_ATTRIBUTE:
      return requestSaveAttribute(state, action)
    case REQUEST_SAVE_ATTRIBUTE_SUCCESS:
      return requestSaveAttributeSuccess(state,action)
    case REQUEST_SAVE_ATTRIBUTE_FAILURE:
      return requestSaveAttributeFailure(state, action)
    default:
    	return state
   }
}

// acts as if everything has already been saved
function requestSaveAttribute(state, action) {
  return update(state, {
    data: {
      organized_attrs: {
        [action.index]: {
          $merge: {value: action.params.value}
        }
      }
    },
    ui: {
      $merge: { isSavingAttribute: true }
    }
  })
}

function requestSaveAttributeSuccess(state, action) {
  return state
}

// if it failed, revert back to the old value 
function requestSaveAttributeFailure(state, action) {
  // if the user has moved onto a different task, don't do anything
  if (state.data.id !== action.params.task)
    return state

  return update(state, {
    data: {
      organized_attrs: {
        [action.index]: {
          $merge: {value: action.params.value}
        }
      }
    }
  })

}



