import update from 'immutability-helper'
import { apiDataReducer } from './APIDataReducer'
import { _taskAttribute } from './TaskAttributeReducerExtension'

export const MARK_OUTPUT_USED = 'MARK_OUTPUT_USED'
export const REQUEST_EDIT_TASK = 'REQUEST_EDIT_TASK'
export const REQUEST_EDIT_TASK_SUCCESS = 'REQUEST_EDIT_TASK_SUCCESS'
export const REQUEST_PUSH_TO_TASK_SUCCESS = 'REQUEST_PUSH_TO_TASK_SUCCESS'
export const REQUEST_EDIT_TASK_FAILURE = 'REQUEST_EDIT_TASK_FAILURE'

export function _task(state, action) {
	let ns = apiDataReducer(state, action)
  ns = _taskAttribute(ns, action)

	switch (action.type) {
	  case MARK_OUTPUT_USED:
    	return markOutputUsed(ns, action)
    case REQUEST_EDIT_TASK:
    	return requestEditTask(ns, action)
    case REQUEST_EDIT_TASK_SUCCESS:
      return requestEditTaskSuccess(ns, action)
    case REQUEST_PUSH_TO_TASK_SUCCESS:
      return requestPushToTaskSuccess(ns, action)
    case REQUEST_EDIT_TASK_FAILURE:
      return requestEditTaskFailure(ns, action)
    
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

function requestEditTask(state, action) {
  return update( state, {
    ui: {
      isEditingItem: {
        $set: true
      },
    },
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

function requestPushToTaskSuccess(state, action) {
  return update(state, {
    ui: {
      isEditingItem: {
        $set: false
      },
    },
    data: {
      [action.field]: {
        $push: action.value
      } 
    },
  })
}

function requestEditTaskFailure(state, action) {
  console.error('Oh no! Something went wrong!\n' + JSON.stringify(action.error))
  return update(state, {
    ui: {
      $merge: {
        isEditingItem: false,
        error: action.error
      }
    },
  })
}