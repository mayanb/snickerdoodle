import update from 'immutability-helper'
import {apiDataReducer} from './APIDataReducer'
import * as types from './ReducerTypes'
import * as ranges from '../components/Goals/GoalTypes'

export const SWITCH_ACTIVE_GOAL_TYPE = 'SWITCH_ACTIVE_GOAL_TYPE' 

export function weeklyGoalPredicate(action) {
	return action.name === types.GOALS && (!action.timerange || action.timerange === ranges.WEEKLY)
}

export function monthlyGoalPredicate(action) {
	return action.name === types.GOALS && (!action.timerange || action.timerange === ranges.MONTHLY)
}

export function _goals(state, action) {
	let ns = apiDataReducer(state, action)

  switch (action.type) {
	  case SWITCH_ACTIVE_GOAL_TYPE:
    	return switchActiveGoalType(ns, action)
    default:
      return ns
  }
}

function switchActiveGoalType(state, action) {
	console.log(action.timerange + " " + action.set_to)
	return update(state, {
		ui: {
			active: {$set: action.timerange === action.set_to}
		}
	})
}