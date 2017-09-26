import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import update from 'immutability-helper'
import {findPosition, alphabetize} from './components/Logic/arrayutils.jsx'
import _users from './components/AccountMenu/UserReducer'

var stateDefault = {
  data: [],
  ui: {
    isFetchingData: false,
    isCreatingItem: false,
    isDeletingItem: false,
    isEditingItem: false,
    currentPage: 0,
    page_size: 15,
    selectedItem: 4,
    error: null
  }
}

var movementsDefault = stateDefault
var productsDefault = stateDefault
var processesDefault = stateDefault
var inventoriesDefault = stateDefault
var processInventoriesDefault = stateDefault
var taskDefault = stateDefault
var taskAncestorsDefault = stateDefault
var taskDescendentsDefault = stateDefault


export const REQUEST = 'REQUEST'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'
export const REQUEST_CREATE = 'REQUEST_CREATE'
export const REQUEST_CREATE_SUCCESS = 'REQUEST_CREATE_SUCCESS'
export const REQUEST_CREATE_FAILURE = 'REQUEST_CREATE_FAILURE'
export const REQUEST_DELETE = 'REQUEST_DELETE'
export const REQUEST_DELETE_SUCCESS = 'REQUEST_DELETE_SUCCESS'
export const REQUEST_DELETE_FAILURE = 'REQUEST_DELETE_FAILURE'
export const REQUEST_EDIT = 'REQUEST_EDIT'
export const REQUEST_EDIT_SUCCESS = 'REQUEST_EDIT_SUCCESS'
export const SELECT = 'SELECT'
export const PAGE = 'PAGE'

export const MOVEMENTS = 'MOVEMENTS'
export const PRODUCTS = 'PRODUCTS'
export const PROCESSES = 'PROCESSES'
export const INVENTORIES = 'INVENTORIES'
export const PROCESS_INVENTORY = 'PROCESS_INVENTORY'
export const TASK = 'TASK'
export const TASK_ANCESTORS = 'TASK_ANCESTORS'
export const TASK_DESCENDENTS = 'TASK_DESCENDENTS'


function apiDataReducer(state, action) {
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
		case REQUEST_EDIT:
			return requestDelete(state, action)
	    case REQUEST_EDIT_SUCCESS:
			return requestDeleteSuccess(state, action)
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
	console.log(action)

  let position = findPosition(state.data, action.item, alphabetize)
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


function requestEdit(state, action) {
  return update(state, {
    ui: {
      isEditingItem: {
        $set: true
      }
    }
  })
}

function requestEditSuccess(state, action) {
  return update(state, {
    ui: {
      isEditingItem: {
        $set: false
      },
    },
    items: {
      $merge: {
        [action.item.id]: action.item
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


function createFilteredReducer(reducerFunction, reducerPredicate, defaultState) {
    return (state, action) => {
        const isInitializationCall = state === undefined;
        const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
        if (isInitializationCall) { 
        	return reducerFunction(defaultState, action);
        }
        return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
    }
}

export default function(data) {
  //var reducer = combineReducers({products: productReducer, processes: processReducer, movements: movementsReducer})

  var reducer = combineReducers({
    users: _users,
  	products:  createFilteredReducer(apiDataReducer, action => action.name === 'PRODUCTS', productsDefault), 
  	processes: createFilteredReducer(apiDataReducer, action => action.name === 'PROCESSES', processesDefault), 
  	movements: createFilteredReducer(apiDataReducer, action => action.name === 'MOVEMENTS', movementsDefault), 
  	inventories: createFilteredReducer(apiDataReducer, action => action.name === 'INVENTORIES', inventoriesDefault), 
  	task: createFilteredReducer(apiDataReducer, action => action.name === 'TASK', taskDefault), 
  	taskDescendents: createFilteredReducer(apiDataReducer, action => action.name === 'TASK_DESCENDENTS', taskDescendentsDefault), 
  	taskAncestors: createFilteredReducer(apiDataReducer, action => action.name === 'TASK_ANCESTORS', taskAncestorsDefault), 
  	processInventories: createFilteredReducer(apiDataReducer, action => action.name === 'PROCESS_INVENTORY', processInventoriesDefault),  })

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))

  return store
}