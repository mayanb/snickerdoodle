import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST_CREATE,
	REQUEST_CREATE_SUCCESS,
	REQUEST_CREATE_FAILURE,
} from '../../reducers/APIDataReducer'
import {
	REQUEST_UPDATE_SETTING,
	REQUEST_UPDATE_SETTING_SUCCESS,
	REQUEST_UPDATE_SETTING_FAILURE,
} from '../AccountMenu/UserActions'

import {TEAMS} from "../../reducers/ReducerTypes"

function progressWalkthrough(endpoint) {
	return function (dispatch) {
    dispatch(requestIncrementWalkthrough())

    // actually fetch
    return api.put(endpoint)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestIncrementWalkthroughError(err))
        } else {
          dispatch(requestIncrementWalkthroughSuccess(res.body))
        }
      })
  }
}

export function incrementWalkthrough(user) {
	return progressWalkthrough(`/ics/userprofiles/increment-walkthrough/${user.profile_id}/`)
}

function requestIncrementWalkthrough(walkthrough) {
  return {
    type: REQUEST_UPDATE_SETTING,
    key: 'walkthrough'
  }
}

function requestIncrementWalkthroughError(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_UPDATE_SETTING_FAILURE
  }
}

function requestIncrementWalkthroughSuccess(json) {
	console.log(json)
  return {
    type: REQUEST_UPDATE_SETTING_SUCCESS,
    key: 'walkthrough',
    value: json.walkthrough 
  }
}

export function completeWalkthrough(user) {
	return progressWalkthrough(`/ics/userprofiles/complete-walkthrough/${user.profile_id}/`)
}

export function postCreateTeam(teamName) {
	return function (dispatch) {
		dispatch(requestCreateTeam())
		return api.post('/ics/teams/create/')
			.send({name: teamName})
			.then((res) => dispatch(requestCreateTeamSuccess(res.body)))
			.catch((err) => dispatch(requestCreateTeamFailure(err)))
	}
}


function requestCreateTeam() {
	return {
		type: REQUEST_CREATE,
		name: TEAMS
	}
}

function requestCreateTeamFailure(err) {
	alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
	return {
		type: REQUEST_CREATE_FAILURE,
		name: TEAMS,
		error: err,
	}
}

function requestCreateTeamSuccess(json) {
	return {
		type: REQUEST_CREATE_SUCCESS,
		item: json,
		name: TEAMS,
	}
}

