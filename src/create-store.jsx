import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import update from 'immutability-helper'
import {stateDefault} from './states'

import {findPosition, alphabetize} from './utilities/arrayutils.jsx'
import {apiDataReducer} from './reducers/APIDataReducer'
import {_task} from './reducers/TaskReducerExtension'
import {_process} from './reducers/ProcessReducerExtension'
import {_goals} from './reducers/GoalsReducer'
import _users from './reducers/UserReducer'
import * as types from './reducers/ReducerTypes'
import {weeklyGoalPredicate, monthlyGoalPredicate} from './reducers/GoalsReducer'


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
    activity: createFilteredReducer(apiDataReducer, action => action.name === types.ACTIVITY, stateDefault),
    weeklyGoals:  createFilteredReducer(_goals, weeklyGoalPredicate, stateDefault),
    monthlyGoals:  createFilteredReducer(_goals, monthlyGoalPredicate, stateDefault),
    members:  createFilteredReducer(apiDataReducer, action => action.name === types.MEMBERS, stateDefault), 
  	products:  createFilteredReducer(apiDataReducer, action => action.name === types.PRODUCTS, stateDefault), 
  	processes: createFilteredReducer(_process, action => action.name === types.PROCESSES, stateDefault), 
  	movements: createFilteredReducer(apiDataReducer, action => action.name === types.MOVEMENTS, stateDefault), 
  	inventories: createFilteredReducer(apiDataReducer, action => action.name === types.INVENTORIES, stateDefault), 
  	task: createFilteredReducer(_task, action => action.name === types.TASK, stateDefault), 
  	taskDescendents: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_DESCENDENTS, stateDefault), 
  	taskAncestors: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_ANCESTORS, stateDefault), 
  	taskAttribute: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_ATTRIBUTE, stateDefault), 
  	processInventories: createFilteredReducer(apiDataReducer, action => action.name === types.PROCESS_INVENTORY, stateDefault),
    graphs: createFilteredReducer(apiDataReducer, action => action.name === types.GRAPHS, stateDefault),
    contacts: createFilteredReducer(apiDataReducer, action => action.name === types.CONTACTS, stateDefault),
    inventoryUnits: createFilteredReducer(apiDataReducer, action => action.name === types.INVENTORY_UNITS, stateDefault),
    orderItems: createFilteredReducer(apiDataReducer, action => action.name === types.ORDER_ITEMS, stateDefault),
    packingOrder: createFilteredReducer(apiDataReducer, action => action.name === types.PACKING_ORDER, stateDefault),
    packingOrders: createFilteredReducer(apiDataReducer, action => action.name === types.PACKING_ORDERS, stateDefault), 
    alert_missed_goals: createFilteredReducer(apiDataReducer, action => action.name === types.ALERT_MISSED_GOALS, stateDefault),
    alert_flagged_tasks: createFilteredReducer(apiDataReducer, action => action.name === types.ALERT_FLAGGED_TASKS, stateDefault),
    alert_anomalous_inputs: createFilteredReducer(apiDataReducer, action => action.name === types.ALERT_ANOMALOUS_INPUTS, stateDefault),
    alert_completed_goals: createFilteredReducer(apiDataReducer, action => action.name === types.ALERT_COMPLETED_GOALS, stateDefault),
    alert_unflagged_tasks: createFilteredReducer(apiDataReducer, action => action.name === types.ALERT_UNFLAGGED_TASKS, stateDefault),
  })

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))

  return store
}