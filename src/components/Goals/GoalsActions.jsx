import api from '../WaffleconeAPI/api.jsx'
import {
	TOGGLE_EDITING
} from '../../reducers/APIDataReducer'
import { SWITCH_ACTIVE_GOAL_TYPE } from '../../reducers/GoalsReducer'
import { GOALS } from '../../reducers/ReducerTypes'
import { WEEKLY } from './GoalTypes'
import * as actions from '../../reducers/APIDataActions'

export function fetchGoals() {
	const request = {
		url: '/ics/goals/',
		query: {}
	}
	return actions.fetch(GOALS, request, null, res => res.body)
}

export function postCreateGoal(data) {
	const request = {
		url: '/ics/goals/create/',
		data: data
	}
	return actions.postCreate(GOALS, request, null, res => res.body)
}

export function postDeleteGoal(goal, index) {
	const request = {
		url: `/ics/goals/edit/${goal.id}/`,
		data: {
			is_trashed: true
		}
	}
	return actions.postDelete(GOALS, request, index)
}

export function postEditGoalAmount(goal, amount, index) {
	const request = {
		url: `/ics/goals/edit/${goal.id}/`,
		data: {
			goal: amount
		}
	}
	return actions.postEdit(GOALS, request, index, res => res.body)
}


export function toggleEditing(timerange) {
	return {
		type: TOGGLE_EDITING,
		name: GOALS,
		timerange: timerange
	}
}

export function switchActiveGoalType(timerange) {
	return {
		type: SWITCH_ACTIVE_GOAL_TYPE,
		name: GOALS,
		timerange: WEEKLY,
		set_to: timerange
	}
}





