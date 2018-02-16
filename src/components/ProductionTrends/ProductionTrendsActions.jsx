import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST_TRENDS,
  REQUEST_TRENDS_SUCCESS,
  REQUEST_TRENDS_FAILURE,
} from '../../reducers/ProductionTrendsReducer'
import {  PRODUCTION_TRENDS } from '../../reducers/ReducerTypes'
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
		  start: toUTCString(moment().subtract(12, 'months')),
		  end: toUTCString(moment())
	  }

    return api.get(PATH)
	    .query(q)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestRecentMonthsFailure(err))
        } else {
          dispatch(requestRecentMonthsSuccess(res.body))
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

		const start = moment().startOf('month')

		const q = {
			bucket: 'day',
			process_type: processType,
			start: toUTCString(start),
			end: toUTCString(moment())
		}

		return api.get(PATH)
			.query(q)
			.end( function (err, res) {
				if (err || !res.ok) {
					dispatch(requestMonthToDateFailure(err))
				} else {
					dispatch(requestMonthToDateSuccess(addMissingDates(res.body, start)))
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
		const start = moment().startOf('week')

		const q = {
			bucket: 'day',
			process_type: processType,
			start: toUTCString(start),
			end: toUTCString(moment())
		}

		return api.get(PATH)
			.query(q)
			.end( function (err, res) {
				if (err || !res.ok) {
					dispatch(requestWeekToDateFailure(err))
				} else {
					dispatch(requestWeekToDateSuccess(addMissingDates(res.body, start)))
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

function addMissingDates(data, start) {
	const startDay = start.date()
	const endDay = moment().date()
	return Array.from({length: endDay - startDay + 1}, (x,i) => i + startDay)
		.map(day => {
			const date = moment([moment().year(), moment().month(), day])
			const dateString = date.format('YYYY-MM-DD')
			const existingData = data.find(datum => dateString === datum.bucket)
			return existingData ?
				existingData :
				{
					bucket: dateString,
					total_amount: 0
				}
		})
}
