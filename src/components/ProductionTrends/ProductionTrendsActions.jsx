import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST_TRENDS,
	REQUEST_TRENDS_SUCCESS,
	REQUEST_TRENDS_FAILURE,
} from '../../reducers/ProductionTrendsReducer'
import { PRODUCTION_TRENDS } from '../../reducers/ReducerTypes'
import moment from 'moment'
import { toUTCString, compareDates } from '../../utilities/dateutils'

export const RECENT_MONTHS = 'RECENT_MONTHS'
export const MONTH_TO_DATE = 'MONTH_TO_DATE'
export const WEEK_TO_DATE = 'WEEK_TO_DATE'

const PATH = '/graphs/production-actuals/'


export function fetchRecentMonths(processType) {
	return function (dispatch) {
		dispatch(requestRecentMonths())

		const q = {
			process_type: processType,
			start: toUTCString(today().subtract(12, 'months')),
			end: toUTCString(today().add(1, 'days'))
		}

		return api.get(PATH)
			.query(q)
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestRecentMonthsFailure(err))
				} else {
					const end = today().startOf('month')
					const start = end.clone().subtract(12, 'months')
					dispatch(requestRecentMonthsSuccess(
						addMissingPeriods(res.body, start, end, 'months')
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
	alert('Oh no! Something went wrong\n' + err)
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

export function fetchMonthToDate(processType) {
	return function (dispatch) {
		dispatch(requestMonthToDate())

		const end = today()
		const start = end.clone().startOf('month')

		const q = {
			bucket: 'day',
			process_type: processType,
			start: toUTCString(start),
			end: toUTCString(today().add(1, 'days'))
		}

		return api.get(PATH)
			.query(q)
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
	alert('Oh no! Something went wrong\n' + err)
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

export function fetchWeekToDate(processType) {
	return function (dispatch) {
		dispatch(requestWeekToDate())

		const end = today()
		const start = end.clone().startOf('week')

		const q = {
			bucket: 'day',
			process_type: processType,
			start: toUTCString(start),
			end: toUTCString(today().add(1, 'days'))
		}

		return api.get(PATH)
			.query(q)
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
	alert('Oh no! Something went wrong\n' + err)
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
	const numPeriods = periodDifference(start, end, periodType) + 1

	return Array.from({ length: numPeriods }, (x, i) => i)
		.map(i => {
			const date = start.clone().add(i, periodType)
			const existingData = data.find(datum => compareDates(date, moment(datum.bucket)))
			return existingData ?
				existingData :
				{
					bucket: date.format('YYYY-MM-DD'),
					total_amount: 0
				}
		})

}

function today() {
	return moment().startOf('day')
}

function periodDifference(start, end, periodType) {
	return Math.round(moment.duration(end.diff(start)).as(periodType))
}
