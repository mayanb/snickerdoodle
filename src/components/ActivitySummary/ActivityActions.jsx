import moment from 'moment'
import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import { ACTIVITY } from '../../reducers/ReducerTypes'

export function fetchActivity() {
  return function (dispatch) {
    // dispatch an action that we are requesting a goal
    dispatch(requestActivity())

    // actually fetch 
    return api.get('/ics/activity/')
      .query(getTodayDateRange())
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestActivityFailure(err))
        }
        dispatch(requestActivitySuccess(res.body))
      })
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

function requestActivitySuccess(json, timerange) {
  return {
    type: REQUEST_SUCCESS,
    name: ACTIVITY,
    data: json, 
    timerange: timerange
  }
}

function getTodayDateRange() {
  let end = moment()
  let start = moment(end).startOf('date');
  let format = 'YYYY-MM-DD-HH-mm-ss-SSSSSS'

   return {
    start: start.utc().format(format),
    end: end.utc().format(format)
  }
}