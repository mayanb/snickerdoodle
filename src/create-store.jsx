import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Raven from "raven-js"
import createRavenMiddleware from "raven-for-redux"
import { stateDefault, productionTrendsStateDefault, modalStateDefault } from './states'

import { apiDataReducer } from './reducers/APIDataReducer'
import { _task } from './reducers/TaskReducerExtension'
import { _process } from './reducers/ProcessReducerExtension'
import { _inventory } from './reducers/InventoryReducerExtension'
import { _productionPlanning } from './reducers/ProductionPlanningReducerExtension'
import _users from './reducers/UserReducer'
import { _modal } from './reducers/ModalReducer'
import productionTrendsReducer from './reducers/ProductionTrendsReducer'
import * as types from './reducers/ReducerTypes'

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
	  goals:  createFilteredReducer(apiDataReducer, action => action.name === types.GOALS, stateDefault),
	  pins:  createFilteredReducer(apiDataReducer, action => action.name === types.PINS, stateDefault),
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
    graphs: createFilteredReducer(apiDataReducer, action => action.name === types.GRAPHS, stateDefault),
    alerts: createFilteredReducer(apiDataReducer, action => action.name === types.ALERTS, stateDefault),
	  productionTrends: createFilteredReducer(productionTrendsReducer, action => action.name === types.PRODUCTION_TRENDS, productionTrendsStateDefault),
	  modal: createFilteredReducer(_modal, action => action.name === types.MODAL, modalStateDefault),
		inventory: createFilteredReducer(_inventory, action => action.name === types.INVENTORY, stateDefault),
		productionPlanning: createFilteredReducer(_productionPlanning, action => action.name === types.PRODUCTION_PLANNING, stateDefault),
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