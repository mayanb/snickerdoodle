import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import update from 'immutability-helper'
import {findPosition, alphabetize} from './components/Logic/arrayutils.jsx'
import {apiDataReducer} from './APIDataReducer'
import {_task} from './TaskReducerExtension'
import _users from './components/AccountMenu/UserReducer'
import * as types from './ReducerTypes'

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
  var reducer = combineReducers({
    users: _users,
  	products:  createFilteredReducer(apiDataReducer, action => action.name === types.PRODUCTS, stateDefault), 
  	processes: createFilteredReducer(apiDataReducer, action => action.name === types.PROCESSES, stateDefault), 
  	movements: createFilteredReducer(apiDataReducer, action => action.name === types.MOVEMENTS, stateDefault), 
  	inventories: createFilteredReducer(apiDataReducer, action => action.name === types.INVENTORIES, stateDefault), 
  	task: createFilteredReducer(_task, action => action.name === types.TASK, stateDefault), 
  	taskDescendents: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_DESCENDENTS, stateDefault), 
  	taskAncestors: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_ANCESTORS, stateDefault), 
  	taskAttribute: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_ATTRIBUTE, stateDefault), 
  	processInventories: createFilteredReducer(apiDataReducer, action => action.name === types.PROCESS_INVENTORY, stateDefault),  })

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))

  return store
}