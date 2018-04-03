import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST, 
	REQUEST_SUCCESS, 
	REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import {  TEAMS, TASKS } from '../../reducers/ReducerTypes'


export function fetchTeams(q) {
	return function (dispatch) {
		// dispatch an action that we are requesting a process
		dispatch(requestTeams())

		// actually fetch 
		return api.get('/ics/teams/2')
			.query(q)
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


export function fetchTasks(q) {
	return function (dispatch) {
		// dispatch an action that we are requesting a process
		dispatch(requestTasks())

		// actually fetch 
		return api.get('/ics/tasks/?team=24')
			//need to pass in team: 24 or whatever the team id is
			// yesterday = new Date()
			// yesterday.setDate(yesterday.getDate() - 1)
			// {team: 24,
			// is_open: true,
			// start: DateFormatter.format(yesterday),
			// end: DateFormatter.format(new Date())}

			// .query(q)
			.query({team: 24})
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
