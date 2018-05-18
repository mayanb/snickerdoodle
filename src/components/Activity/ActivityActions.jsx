import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST,
	REQUEST_SUCCESS,
	REQUEST_FAILURE,
	PAGE,
} from '../../reducers/APIDataReducer'
import { ACTIVITY, CSV, GOOGLE_SHEET } from '../../reducers/ReducerTypes'
import fileDownload from 'js-file-download'
import { dateToUTCString } from '../../utilities/dateutils'
import { isDandelion } from '../../utilities/userutils'

export function fetchActivity(params) {
	return function (dispatch) {
		dispatch(requestActivity())
		return api.get('/ics/activity/')
			.query(params)
			.then(res => dispatch(requestActivitySuccess(res.body)))
			.catch(err => dispatch(requestActivityFailure(err)))
	}
}

function requestActivity() {
	return {
		type: REQUEST,
		name: ACTIVITY
	}
}

function requestActivityFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_FAILURE,
		name: ACTIVITY
	}
}

function requestActivitySuccess(activityRows) {
	return {
		type: REQUEST_SUCCESS,
		name: ACTIVITY,
		data: activityRows,
	}
}

function createParams(filters, userID) {
	const { selectedProcesses, selectedProducts, dates: { start, end } } = filters
	let params = {
		start: dateToUTCString(start),
		end: dateToUTCString(end, true),
		processes: selectedProcesses.join(','),
		products: selectedProducts.join(','),
		user_id: userID,
	}
	if (filters.keywords) {
		params.label = filters.keywords
		params.dashboard = 'true'
	}
	if (filters.flaggedOnly) {
		params.flagged = 'true'
	}
	return params
}

function csvTitle(filters, processes) {
	const { selectedProcesses, dates: { start, end } } = filters
	let name
	if (selectedProcesses.length === 1) {
		name = processes.find(p => String(p.id) === String(selectedProcesses[0])).name
	} else {
		name = 'Runs'
	}
	return `${name} - ${start}-${end}`
}

function fetchCsv(filters, user, processes) {
	return function (dispatch) {
		const params = createParams(filters, user.user_id)
		const title = csvTitle(filters, processes)
		dispatch(requestCsv())
		return api.post('/gauth/create-csv/')
			.type('form')
			.send(params)
			.responseType('blob')
			.then(res => {
				dispatch(requestCsvSuccess())
				return fileDownload(res.body, `${title}.csv`)
			})
			.catch(err => dispatch(requestCsvFailure(err)))
	}
}

function requestCsv() {
	return {
		type: REQUEST,
		name: CSV
	}
}

function requestCsvFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_FAILURE,
		name: CSV
	}
}

function requestCsvSuccess() {
	return {
		type: REQUEST_SUCCESS,
		name: CSV,
		data: null,
	}
}

function fetchGoogleSheet(filters, user, toggleDialog) {
	return function (dispatch) {
		const params = createParams(filters, user.user_id)
		if (!user.gauth_access_token) {
			toggleDialog('mustConnectGoogleDialog')
			return dispatch(requestGoogleSheetFailure('Must connect Google Account'))
		}
		dispatch(requestGoogleSheet())
		return api.post('/gauth/create-spreadsheet/')
			.type('form')
			.send(params)
			.then(res => {
				dispatch(requestGoogleSheetSuccess(res.body))
				let url = 'https://docs.google.com/spreadsheets/d/' + res.body.spreadsheetId + '/'
				let newWin = window.open(url, '_blank');
				if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
					//POPUP BLOCKED
					toggleDialog('mustEnablePopupsDialog')
				}
				return res
			})
			.catch(err => dispatch(requestGoogleSheetFailure(err)))
	}
}

function requestGoogleSheet() {
	return {
		type: REQUEST,
		name: GOOGLE_SHEET
	}
}

function requestGoogleSheetFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_FAILURE,
		name: GOOGLE_SHEET
	}
}

function requestGoogleSheetSuccess() {
	return {
		type: REQUEST_SUCCESS,
		name: GOOGLE_SHEET,
		data: null,
	}
}

export function fetchDownload(filters, user, processes, toggleDialog) {
	const team = user.team_name
	if (isDandelion(team)) {
		return fetchCsv(filters, user, processes)
	} else {
		return fetchGoogleSheet(filters, user, toggleDialog)
	}
}

export function pageActivity(direction) {
	return {
		type: PAGE,
		direction: direction,
		name: ACTIVITY

	}
}