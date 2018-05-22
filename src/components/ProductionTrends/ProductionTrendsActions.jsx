import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST_TRENDS,
	REQUEST_TRENDS_SUCCESS,
	REQUEST_TRENDS_FAILURE,
} from '../../reducers/ProductionTrendsReducer'
import { PRODUCTION_TRENDS } from '../../reducers/ReducerTypes'
import moment from 'moment'
import { toUTCString, compareDates } from '../../utilities/dateutils'
import * as downloadActions from '../../reducers/DownloadActions'

export const RECENT_MONTHS = 'RECENT_MONTHS'
export const MONTH_TO_DATE = 'MONTH_TO_DATE'
export const WEEK_TO_DATE = 'WEEK_TO_DATE'

const PATH = '/graphs/production-actuals/'

function convertParams(start, processType, productTypes, bucket) {
	const q = {
		start: toUTCString(start),
		end: toUTCString(today().add(1, 'days')),
		process_type: processType,
		bucket: bucket
	}
	if (productTypes.length)
		q.product_types = productTypes.join(',')

	return q
}


export function fetchRecentMonths(processType, productTypes) {
	return function (dispatch) {
		dispatch(requestRecentMonths())

		return api.get(PATH)
			.query(convertParams(today().subtract(12, 'months'),  processType, productTypes, 'month'))
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestRecentMonthsFailure(err))
				} else {
					const end = today().startOf('month')
					const start = today().startOf('month').subtract(12, 'months')
					let realData = addMissingPeriods(res.body, start, end, 'months')
					// let fakeData = realData.map(e => {
					// 	return { ...e, total_amount: e.total_amount * (Math.random() * 1.5 + 0.1)}
					// })
					dispatch(requestRecentMonthsSuccess(
						// fakeData
						realData
					))
				}
			})
	}
}

function requestRecentMonths() {
	return {
		type: REQUEST_TRENDS,
		name: PRODUCTION_TRENDS,
		query: RECENT_MONTHS
	}
}

function requestRecentMonthsFailure(err) {
	return {
		type: REQUEST_TRENDS_FAILURE,
		name: PRODUCTION_TRENDS,
		query: RECENT_MONTHS
	}
}

function requestRecentMonthsSuccess(json) {
	return {
		type: REQUEST_TRENDS_SUCCESS,
		name: PRODUCTION_TRENDS,
		query: RECENT_MONTHS,
		data: json,
	}
}

export function fetchMonthToDate(processType, productTypes) {
	return function (dispatch) {
		dispatch(requestMonthToDate())

		const start = today().startOf('month')
		const end = today().endOf('month').startOf('day')

		return api.get(PATH)
			.query(convertParams(start,  processType, productTypes, 'day'))
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestMonthToDateFailure(err))
				} else {
					dispatch(requestMonthToDateSuccess(
						addMissingPeriods(res.body, start, end, 'days')
					))
				}
			})
	}
}

function requestMonthToDate() {
	return {
		type: REQUEST_TRENDS,
		name: PRODUCTION_TRENDS,
		query: MONTH_TO_DATE
	}
}

function requestMonthToDateFailure(err) {
	return {
		type: REQUEST_TRENDS_FAILURE,
		name: PRODUCTION_TRENDS,
		query: MONTH_TO_DATE
	}
}

function requestMonthToDateSuccess(json) {
	return {
		type: REQUEST_TRENDS_SUCCESS,
		name: PRODUCTION_TRENDS,
		query: MONTH_TO_DATE,
		data: json,
	}
}

export function fetchWeekToDate(processType, productTypes) {
	return function (dispatch) {
		dispatch(requestWeekToDate())

		const start = today().startOf('week')
		const end = today().endOf('week').startOf('day')

		return api.get(PATH)
			.query(convertParams(start,  processType, productTypes, 'day'))
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestWeekToDateFailure(err))
				} else {
					dispatch(requestWeekToDateSuccess(
						addMissingPeriods(res.body, start, end, 'days')
					))
				}
			})
	}
}

function requestWeekToDate() {
	return {
		type: REQUEST_TRENDS,
		name: PRODUCTION_TRENDS,
		query: WEEK_TO_DATE
	}
}

function requestWeekToDateFailure(err) {
	return {
		type: REQUEST_TRENDS_FAILURE,
		name: PRODUCTION_TRENDS,
		query: WEEK_TO_DATE
	}
}

function requestWeekToDateSuccess(json) {
	return {
		type: REQUEST_TRENDS_SUCCESS,
		name: PRODUCTION_TRENDS,
		query: WEEK_TO_DATE,
		data: json,
	}
}

function addMissingPeriods(data, start, end, periodType) {
	const pastDaysEnd = today() < end ? today() : end
	const pastDays = dateArray(start, pastDaysEnd, periodType)
		.map(date => {
			const existingData = data.find(datum => compareDates(date, moment(datum.bucket)))
			return existingData ?
				existingData :
				{
					bucket: date.format('YYYY-MM-DD'),
					total_amount: 0
				}
		})

	const futureDays = dateArray(today().add(1, periodType), end, periodType)
		.map(date => {
			return {
				bucket: date.format('YYYY-MM-DD'),
				total_amount: null
			}
		})
	return pastDays.concat(futureDays)
}

function dateArray(start, end, periodType) {
	if (start > end)
		return []

	const numPeriods = periodDifference(start, end, periodType) + 1
	return Array.from({ length: numPeriods }, (x, i) => i)
		.map(i => {
			return start.clone().add(i, periodType)
		})
}

function today() {
	return moment().startOf('day')
}

function periodDifference(start, end, periodType) {
	return Math.round(moment.duration(end.diff(start)).as(periodType))
}

export function fetchDownload(selectedProcess, selectedProducts, processes, toggleDialog) {
	const user = api.get_active_user().user
	const params = {
		process: selectedProcess,
		products: selectedProducts.join(','),
		user_id: user.user_id,
	}
	const name = processes.find(p => String(p.id) === String(selectedProcess)).name
	const title = `${name} - Recent Trends`
	const csvRequest = {
		url: '/gauth/trends-csv/',
		query: params,
		title: title,
	}
	const googleRequest = {
		url: '/gauth/trends-spreadsheet/',
		query: params,
	}
	return downloadActions.fetchDownload(csvRequest, googleRequest, user, toggleDialog)
}
