import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Raven from "raven-js"
import createRavenMiddleware from "raven-for-redux"
import { stateDefault, productionTrendsStateDefault, modalStateDefault } from './states'

import {apiDataReducer} from './reducers/APIDataReducer'
import {_task} from './reducers/TaskReducerExtension'
import {_process} from './reducers/ProcessReducerExtension'
import {_formula} from './reducers/FormulaReducerExtension'
import { _inventory2 } from './reducers/Inventory2ReducerExtension'
import _users from './reducers/UserReducer'
import { _modal } from './reducers/ModalReducer'
import productionTrendsReducer from './reducers/ProductionTrendsReducer'
import * as types from './reducers/ReducerTypes'
import {weeklyGoalPredicate, monthlyGoalPredicate, _goals} from './reducers/GoalsReducer'

Raven.config('https://8c758a47f63642cba6d88e88b0d54227@sentry.io/465008', {
	environment: process.env.REACT_APP_BACKEND
}).install()

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
    teams: createFilteredReducer(apiDataReducer, action => action.name === types.TEAMS, stateDefault), 
  	products:  createFilteredReducer(apiDataReducer, action => action.name === types.PRODUCTS, stateDefault),
		recipes:  createFilteredReducer(apiDataReducer, action => action.name === types.RECIPES, stateDefault),
		processes: createFilteredReducer(_process, action => action.name === types.PROCESSES, stateDefault),
  	movements: createFilteredReducer(apiDataReducer, action => action.name === types.MOVEMENTS, stateDefault), 
  	task: createFilteredReducer(_task, action => action.name === types.TASK, stateDefault),
    tasks: createFilteredReducer(apiDataReducer, action => action.name === types.TASKS, stateDefault), 
  	taskDescendents: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_DESCENDENTS, stateDefault), 
  	taskAncestors: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_ANCESTORS, stateDefault), 
  	taskAttribute: createFilteredReducer(apiDataReducer, action => action.name === types.TASK_ATTRIBUTE, stateDefault), 
  	processInventories: createFilteredReducer(apiDataReducer, action => action.name === types.PROCESS_INVENTORY, stateDefault),
    graphs: createFilteredReducer(apiDataReducer, action => action.name === types.GRAPHS, stateDefault),
    contacts: createFilteredReducer(apiDataReducer, action => action.name === types.CONTACTS, stateDefault),
    alerts: createFilteredReducer(apiDataReducer, action => action.name === types.ALERTS, stateDefault),
    formulas: createFilteredReducer(_formula, action => action.name === types.FORMULAS, stateDefault),
	  productionTrends: createFilteredReducer(productionTrendsReducer, action => action.name === types.PRODUCTION_TRENDS, productionTrendsStateDefault),
	  modal: createFilteredReducer(_modal, action => action.name === types.MODAL, modalStateDefault),
    inventory2: createFilteredReducer(_inventory2, action => action.name === types.INVENTORY_2, stateDefault),
  })
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(
    	thunkMiddleware,
	    createRavenMiddleware(Raven, {
		    // Optionally pass some options here.
	    })),
	))

  return store
}