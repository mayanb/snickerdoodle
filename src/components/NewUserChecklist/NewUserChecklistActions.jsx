import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST, 
	REQUEST_SUCCESS, 
	REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import {  TEAMS, TASKS } from '../../reducers/ReducerTypes'


export function fetchTeams(teamID) {
	return function (dispatch) {
		dispatch(requestTeams())

		// actually fetch 
		return api.get(`/ics/teams/${teamID}`)
			.then(res => dispatch(requestTeamsSuccess(res.body)))
			.catch(err => dispatch(requestTeamsFailure(err)))
	}
}

function requestTeams() {
	return {
		type: REQUEST,
		name: TEAMS
	}
}

function requestTeamsFailure(err) {
	alert('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_FAILURE,
		name: TEAMS

	}
}

function requestTeamsSuccess(json) {
	return {
		type: REQUEST_SUCCESS,
		name: TEAMS,
		data: json, 
	}
}


export function fetchTasks(teamID) {
	// yesterday = new Date()
	// yesterday.setDate(yesterday.getDate() -1)
	// start = DateFormatter.format(yesterday)
	// end = DateFormatter.format(new Date())
	return function (dispatch) {
		dispatch(requestTasks())
		return api.get('/ics/tasks/')
			.query({team: teamID, is_open: true})//, start: startDate, end: endDate})
			.then(res => dispatch(requestTasksSuccess(res.body)))
			.catch(err => dispatch(requestTasksFailure(err)))
	}
}

function requestTasks() {
	return {
		type: REQUEST,
		name: TASKS
	}
}

function requestTasksFailure(err) {
	alert('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_FAILURE,
		name: TASKS

	}
}

function requestTasksSuccess(json) {
	return {
		type: REQUEST_SUCCESS,
		name: TASKS,
		data: json, 
	}
}

