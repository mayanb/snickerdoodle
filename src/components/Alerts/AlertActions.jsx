import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  //REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import {
  ALERTS,
} from '../../reducers/ReducerTypes'

// export function fetchCompletedGoals(user_id) {
//   return fetch('/ics/alerts/complete-goals', ALERT_COMPLETED_GOALS, user_id)
// }

// export function fetchUnflaggedTasks() {
//   return fetch('/ics/alerts/recently-unflagged-tasks', ALERT_UNFLAGGED_TASKS)
// }

// export function fetchMissedGoals() {
//   return fetch('/ics/alerts/incomplete-goals', ALERT_MISSED_GOALS)
// }

// export function fetchFlaggedTasks() {
//   return fetch('/ics/alerts/recently-flagged-tasks', ALERT_FLAGGED_TASKS)
// }

// export function fetchAnomalousInputs() {
//   return fetch('/ics/alerts/recent-anomolous-inputs', ALERT_ANOMALOUS_INPUTS)
// }

export function fetchAlerts(user_id) {
  return fetch('/ics/alerts/', ALERTS) //, user_id)
}

function fetch(endpoint, type, user_id) {
  return function (dispatch) {
    // dispatch an action that we are requesting a goal
    dispatch(request(type))

    // actually fetch 
    return api.get(endpoint)
      .query({userprofile: user_id})
      .end( function (err, res) {
        if (err || !res.ok) {
          //dispatch(requestFailure(type, err))
          return
        }
        dispatch(requestSuccess(type, res.body))
        api.put(`/ics/userprofiles/last-seen/${user_id}/`)
      })
  }
}

function request(type) {
  return {
    type: REQUEST,
    name: type
  }
}

/**
function requestFailure(type, err) {
  console.error('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: type
  }
}
 */

function requestSuccess(type, json) {
  return {
    type: REQUEST_SUCCESS,
    name: type,
    data: json, 
  }
}