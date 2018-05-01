import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST,
	REQUEST_SUCCESS,
	REQUEST_FAILURE,
  PAGE,
} from '../../reducers/APIDataReducer'
import { ACTIVITY } from '../../reducers/ReducerTypes'

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

export function pageActivity(direction) {
	return {
		type: PAGE,
		direction: direction,
		name: ACTIVITY
		
	}
}