import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'
import { _taskAttribute } from './TaskAttributeReducerExtension'

export const MARK_OUTPUT_USED = 'MARK_OUTPUT_USED'
export const REQUEST_EDIT_TASK = 'REQUEST_EDIT_TASK'
export const REQUEST_EDIT_TASK_SUCCESS = 'REQUEST_EDIT_TASK_SUCCESS'

export function _task(state, action) {
	let ns = apiDataReducer(state, action)
  ns = _taskAttribute(ns, action)

	switch (action.type) {
	  case MARK_OUTPUT_USED:
    	return markOutputUsed(ns, action)
    //case REQUEST_EDIT_TASK:
    	//return requestEditTask(ns, action)
    case REQUEST_EDIT_TASK_SUCCESS:
    	return requestEditTaskSuccess(ns, action)
    default:
      return ns
  }
}


function markOutputUsed(state, action) {
  return update(state, {
    data: {
    	items: {
    		[action.index]: {
    			$merge: {is_used: true}
    		}
    	}
    }
  })
}

function requestEditTaskSuccess(state, action) {
  return update(state, {
    ui: {
      isEditingItem: {
        $set: false
      },
    },
    data: {
      $merge: {
        [action.field]: action.value
      }
    },
  })
}