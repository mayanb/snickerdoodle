import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import { ALERT_MISSED_GOALS, ALERT_FLAGGED_TASKS, ALERT_ANOMALOUS_INPUTS } from '../../reducers/ReducerTypes'

export function fetchMissedGoals() {
  return fetch('/ics/alerts/get-incomplete-goals', ALERT_MISSED_GOALS)
}

export function fetchFlaggedTasks() {
  return fetch('/ics/alerts/recently-flagged-tasks', ALERT_FLAGGED_TASKS)
}

export function fetchAnomalousInputs() {
  return fetch('/ics/alerts/recent-anomolous-inputs', ALERT_ANOMALOUS_INPUTS)
}

function fetch(endpoint, type) {
  return function (dispatch) {
    // dispatch an action that we are requesting a goal
    dispatch(request(type))

    // actually fetch 
    return api.get(endpoint)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestFailure(type, err))
        }
        dispatch(requestSuccess(type, res.body))
      })
  }
}

function request(type) {
  return {
    type: REQUEST,
    name: type
  }
}

function requestFailure(type, err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: type
  }
}

function requestSuccess(type, json) {
  return {
    type: REQUEST_SUCCESS,
    name: type,
    data: json, 
  }
}