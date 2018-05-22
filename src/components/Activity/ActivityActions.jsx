import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST,
	REQUEST_SUCCESS,
	REQUEST_FAILURE,
	PAGE,
} from '../../reducers/APIDataReducer'
import { ACTIVITY } from '../../reducers/ReducerTypes'
import * as downloadActions from '../../reducers/DownloadActions'
import { dateToUTCString } from '../../utilities/dateutils'

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

export function fetchDownload(filters, processes, toggleDialog) {
	const user = api.get_active_user().user
	const params = createParams(filters, user.user_id)
	const title = csvTitle(filters, processes)
	const csvRequest = {
		url: '/gauth/create-csv/',
		query: params,
		title: title,
	}
	const googleRequest = {
		url: '/gauth/create-spreadsheet/',
		query: params,
	}
	return downloadActions.fetchDownload(csvRequest, googleRequest, user, toggleDialog)
}

export function pageActivity(direction) {
	return {
		type: PAGE,
		direction: direction,
		name: ACTIVITY

	}
}