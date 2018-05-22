import api from '../components/WaffleconeAPI/api.jsx'
import {
	REQUEST,
	REQUEST_SUCCESS,
	REQUEST_FAILURE,
} from './APIDataReducer'
import { CSV, GOOGLE_SHEET } from './ReducerTypes'
import fileDownload from 'js-file-download'
import { isDandelion } from '../utilities/userutils'


function fetchCsv(request) {
	return function (dispatch) {
		dispatch(requestCsv())
		return api.post(request.url)
			.type('form')
			.send(request.query)
			.responseType('blob')
			.then(res => {
				dispatch(requestCsvSuccess())
				return fileDownload(res.body, `${request.title}.csv`)
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

function fetchGoogleSheet(request, user, toggleDialog) {
	return function (dispatch) {
		if (!user.has_gauth_token) {
			toggleDialog('mustConnectGoogleDialog')
			dispatch(requestGoogleSheetFailure('Must connect Google Account'))
			return new Promise(resolve => resolve())
		}
		dispatch(requestGoogleSheet())
		return api.post(request.url)
			.type('form')
			.send(request.query)
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

export function fetchDownload(csvRequest, googleRequest, user, toggleDialog) {
	const team = user.team_name
	if (isDandelion(team)) {
		return fetchCsv(csvRequest)
	} else {
		return fetchGoogleSheet(googleRequest, user, toggleDialog)
	}
}

