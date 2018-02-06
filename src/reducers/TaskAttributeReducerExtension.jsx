import update from 'immutability-helper'

export const START_EDITING_ATTRIBUTE = 'START_EDITING_ATTRIBUTE'
export const FINISH_EDITING_ATTRIBUTE = 'FINISH_EDITING_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE = 'REQUEST_SAVE_ATTRIBUTE'
export const REQUEST_SAVE_ATTRIBUTE_SUCCESS = 'REQUEST_SAVE_ATTRIBUTE_SUCCESS'
export const REQUEST_SAVE_ATTRIBUTE_FAILURE = 'REQUEST_SAVE_ATTRIBUTE_FAILURE'

export function _taskAttribute(state, action) {
	switch (action.type) {
	  case START_EDITING_ATTRIBUTE:
      return startEditingAttribute(state, action)
    case FINISH_EDITING_ATTRIBUTE:
      return finishEditingAttribute(state,action)
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

function startEditingAttribute(state, action) {
  return update(state, {
    ui: {
      $merge: {
        editingAttribute: action.index,
        isSavingAttribute: false
      }
    }
  })
}

function finishEditingAttribute(state, action) {
  return update(state, {
    ui: {
      $merge: {
        editingAttribute: undefined,
        isSavingAttribute: false
      }
    }
  })
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



