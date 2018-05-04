import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST,
	REQUEST_SUCCESS,
	REQUEST_FAILURE,
  PAGE,
} from '../../reducers/APIDataReducer'
import { ACTIVITY, CSV, GOOGLE_SHEET } from '../../reducers/ReducerTypes'
import fileDownload from 'js-file-download'

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

export function fetchCsv(params, title) {
	return function (dispatch) {

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

export function fetchGoogleSheet(params) {
	return function (dispatch) {
		dispatch(requestGoogleSheet())
		return api.post('/gauth/create-spreadsheet/')
			.type('form')
			.send(params)
			.then(res => {
				dispatch(requestGoogleSheetSuccess(res.body))
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

export function pageActivity(direction) {
	return {
		type: PAGE,
		direction: direction,
		name: ACTIVITY
		
	}
}