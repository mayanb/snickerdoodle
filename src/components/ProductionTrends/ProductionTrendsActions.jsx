import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST_TRENDS,
  REQUEST_TRENDS_SUCCESS,
  REQUEST_TRENDS_FAILURE,
} from '../../reducers/ProductionTrendsReducer'
import {  PRODUCTION_TRENDS } from '../../reducers/ReducerTypes'
import { toUTCString } from '../../utilities/dateutils'

export const RECENT_MONTHS = 'RECENT_MONTHS'
export const MONTH_TO_DATE = 'MONTH_TO_DATE'
export const WEEK_TO_DATE = 'WEEK_TO_DATE'

const PATH = '/graphs/production-actuals/'

export function fetchRecentMonths(processType) {
  return function (dispatch) {
    dispatch(requestRecentMonths())

	  const q = {
    	process_type: processType,
		  start: toUTCString('2017-01-01'),
		  end: toUTCString('2020-12-31')
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

		const q = {
			bucket: 'day',
			process_type: processType,
			start: toUTCString('2018-02-01'),
			end: toUTCString('2018-02-15')
		}

		return api.get(PATH)
			.query(q)
			.end( function (err, res) {
				if (err || !res.ok) {
					dispatch(requestMonthToDateFailure(err))
				} else {
					dispatch(requestMonthToDateSuccess(res.body))
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

		const q = {
			bucket: 'day',
			process_type: processType,
			start: toUTCString('2018-02-05'),
			end: toUTCString('2018-02-09')
		}

		return api.get(PATH)
			.query(q)
			.end( function (err, res) {
				if (err || !res.ok) {
					dispatch(requestWeekToDateFailure(err))
				} else {
					dispatch(requestWeekToDateSuccess(res.body))
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
