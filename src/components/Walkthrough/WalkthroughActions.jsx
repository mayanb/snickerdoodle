import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST_EDIT_ITEM,
  REQUEST_EDIT_ITEM_SUCCESS,
  REQUEST_EDIT_ITEM_FAILURE,
	REQUEST_CREATE,
	REQUEST_CREATE_SUCCESS,
	REQUEST_CREATE_FAILURE,
} from '../../reducers/APIDataReducer'
import {
	REQUEST_UPDATE_SETTING,
} from '../../reducers/UserReducer'

import {WALKTHROUGH, TEAMS} from "../../reducers/ReducerTypes"
import update from 'immutability-helper'

export function incrementWalkthrough(user) {
  return function (dispatch) {
    dispatch(requestIncrementWalkthrough())

    // actually fetch
    return api.put(`/ics/userprofiles/increment-walkthrough/${user.id}/`)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestIncrementWalkthroughError(err))
        } else {
          dispatch(requestIncrementWalkthroughSuccess(res.body.walkthrough))
        }
      })
  }
}

function requestIncrementWalkthrough(walkthrough) {
  return {
    type: '',// REQUEST_UPDATE_SETTING,
    key: 'walkthrough',
    value: walkthrough
  }
}

function requestIncrementWalkthroughError(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: ''//REQUEST_UPDATE_SETTING,
  }
}

function requestIncrementWalkthroughSuccess(json) {
  return {
    type: REQUEST_EDIT_ITEM_SUCCESS,
    name: WALKTHROUGH,
    data: json, 
  }
}

export function completeWalkthrough(user) {
	return function (dispatch) {
		dispatch(requestCompleteWalkthrough())

		// actually fetch
		return api.put(`/ics/userprofiles/complete-walkthrough/${user.id}/`)
			.end( function (err, res) {
				if (err || !res.ok) {
					dispatch(requestCompleteWalkthroughError(err))
				} else {
					dispatch(requestCompleteWalkthroughSuccess(res.body))
				}
			})
	}
}

function requestCompleteWalkthrough() {
	return {
		type: REQUEST_EDIT_ITEM,
		name: WALKTHROUGH
	}
}

function requestCompleteWalkthroughError(err) {
	alert('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_EDIT_ITEM_FAILURE,
		name: WALKTHROUGH

	}
}

function requestCompleteWalkthroughSuccess(json) {
	return {
		type: REQUEST_EDIT_ITEM_SUCCESS,
		name: WALKTHROUGH,
		data: json,
	}
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

