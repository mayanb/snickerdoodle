import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import update from 'immutability-helper'
import {findPosition, alphabetize} from '../components/Logic/arrayutils.jsx'

export const REQUEST = 'REQUEST'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'
export const REQUEST_CREATE = 'REQUEST_CREATE'
export const REQUEST_CREATE_SUCCESS = 'REQUEST_CREATE_SUCCESS'
export const REQUEST_CREATE_FAILURE = 'REQUEST_CREATE_FAILURE'
export const REQUEST_DELETE = 'REQUEST_DELETE'
export const REQUEST_DELETE_SUCCESS = 'REQUEST_DELETE_SUCCESS'
export const REQUEST_DELETE_FAILURE = 'REQUEST_DELETE_FAILURE'
export const REQUEST_EDIT_ITEM = 'REQUEST_EDIT_ITEM'
export const REQUEST_EDIT_ITEM_SUCCESS = 'REQUEST_EDIT_ITEM_SUCCESS'
export const REQUEST_EDIT_ITEM_FAILURE = 'REQUEST_EDIT_ITEM_FAILURE'
export const SELECT = 'SELECT'
export const PAGE = 'PAGE'

export function apiDataReducer(state, action) {
  switch (action.type) {
  	case REQUEST:
    	return request(state, action)
    case REQUEST_SUCCESS:
      return requestSuccess(state, action)
    case REQUEST_FAILURE:
      return requestFailure(state, action)
    case REQUEST_CREATE:
		  return requestCreate(state, action)
    case REQUEST_CREATE_SUCCESS:
		  return requestCreateSuccess(state, action)
	  case REQUEST_CREATE_FAILURE:
		  return requestCreateFailure(state, action)
	  case REQUEST_DELETE:
		  return requestDelete(state, action)
    case REQUEST_DELETE_SUCCESS:
		  return requestDeleteSuccess(state, action)
		case REQUEST_DELETE_FAILURE:
			return requestDeleteFailure(state, action)
    case REQUEST_EDIT_ITEM:
      return requestEditItem(state, action)
    case REQUEST_EDIT_ITEM_SUCCESS:
      return requestEditItemSuccess(state, action)
    case REQUEST_EDIT_ITEM_FAILURE:
      return requestEditItemFailure(state, action)
		case SELECT:
      return select(state, action)
    case PAGE:
      return page(state, action)
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
  return update(state, {
    ui: {
      $merge: {
        isFetchingData: false,
      }
    },
    data: {
      $set: action.data
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


function requestCreate(state, action) {
	console.log("creating?")
  return update(state, {
    ui: {
      isCreatingItem: {
        $set: true
      }
    }
  })
}

function requestCreateSuccess(state, action) {
	console.log(state)
  let position = findPosition(state.data, action.item, action.sort)
  return update(state, {
    ui: {
      isCreatingItem: {
        $set: false
      },
    },
    data: {
      $splice: [[position, 0, action.item]]
    },
  })
}

function requestCreateFailure(state, action) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(action.error))
  return update(state, {
    ui: {
      $merge: {
        isFetchingData: false,
       	error: action.error
      }
    },
  })
}

function requestDelete(state, action) {
  return update(state, {
    ui: {
      isDeletingItem: {
        $set: true
      }
    }
  })
}

function requestDeleteSuccess(state, action) {
  return update(state, {
	data: {
      $splice: [[action.index, 1, ]]
    },
    ui: {
      isDeletingItem: {
        $set: false
      },
    }
  })
}

function requestDeleteFailure(state, action) {
  return update(state, {
    ui: {
      $merge: {
        isDeletingData: false,
       	error: action.error
      }
    },
  })
}


function requestEditItem(state, action) {
  return update(state, {
    ui: {
      isEditingItem: {
        $set: true
      },
    },
  })
}


function requestEditItemSuccess(state, action) {
  let obj = {[action.field]: action.value}
  return update(state, {
    ui: {
      isEditingItem: {
        $set: false
      },
    },
    data: {
      [action.index]: {
        $merge: obj
      }
    },
  })
}


function requestEditItemFailure(state, action) {
  return update(state, {
    ui: {
      $merge: {
        isEditingItem: false,
        error: action.error
      }
    },
  })
}



function select(state, action) {
  // get the page number:
  let index = action.index
  let pageNumber = Math.trunc(index / state.ui.page_size)
  return update(state, {
    ui: {
      $merge: {
        selectedItem: index,
        currentPage: pageNumber
      }
    }
  })
}

function page(state, action) {
  return update(state, {
    ui: {
      currentPage: {
        $set: state.ui.currentPage + action.direction
      }
    }
  })
}