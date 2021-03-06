import {
	TOGGLE_EDITING
} from '../../reducers/APIDataReducer'
import { GOALS, PINS } from '../../reducers/ReducerTypes'
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
		data: { is_trashed: true }
	}
	return actions.softDelete(GOALS, request, index)
}

export function postEditGoalAmount(goal, amount, index) {
	const request = {
		url: `/ics/goals/edit/${goal.id}/`,
		data: {
			goal: amount
		}
	}
	return actions.patchEdit(GOALS, request, index, res => res.body)
}


export function toggleEditing(timerange) {
	return {
		type: TOGGLE_EDITING,
		name: GOALS,
		timerange: timerange
	}
}

export function fetchPins() {
	const request = {
		url: '/ics/pins/',
		query: {}
	}
	return actions.fetch(PINS, request, null, res => res.body)
}

export function postCreatePin(data) {
	const request = {
		url: '/ics/pins/create/',
		data: data
	}
	return actions.postCreate(PINS, request, null, res => res.body)
}

export function postDeletePin(pin, index) {
	const request = {
		url: `/ics/pins/edit/${pin.id}/`,
		data: { is_trashed: true }
	}
	return actions.softDelete(PINS, request, index)
}

