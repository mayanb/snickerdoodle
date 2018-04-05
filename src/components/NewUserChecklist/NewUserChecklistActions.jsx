import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST, 
	REQUEST_SUCCESS, 
	REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import {  TEAMS, TASKS } from '../../reducers/ReducerTypes'
import moment from 'moment'

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
	let startDate = moment().subtract(3,'d').format('YYYY-MM-DD');
	let endDate = moment(new Date()).format("YYYY-MM-DD")
	return function (dispatch) {
		dispatch(requestTasks())
		return api.get('/ics/tasks/')
			.query({team: teamID, is_open: true, start: startDate, end: endDate})
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

