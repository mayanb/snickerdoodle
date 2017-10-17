import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  REQUEST_DELETE,
  REQUEST_DELETE_SUCCESS,
  REQUEST_DELETE_FAILURE,
  REQUEST_EDIT,
  REQUEST_EDIT_SUCCESS,
  SELECT,
  PAGE,
} from '../../Reducers/APIDataReducer'
import { GOALS } from '../../Reducers/ReducerTypes'

export function fetchGoals(user_id) {
  return function (dispatch) {
    // dispatch an action that we are requesting a goal
    dispatch(requestGoals())

    // actually fetch 
    return api.get('/ics/goals/')
      .send({user_profile: user_id})
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestGoalsFailure(err))
        } else {
          dispatch(requestGoalsSuccess(res.body))
        }
      })
  }
}

function requestGoals() {
  return {
    type: REQUEST,
    name: GOALS
  }
}

function requestGoalsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: GOALS

  }
}

function requestGoalsSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    name: GOALS,
    data: json, 
  }
}


export function selectGoal(id) {
  return {
    type: SELECT,
    index: id,
    name: GOALS
  }
}

export function postCreateGoal(json, success) {
  return function (dispatch) {
    dispatch(requestCreateGoal())

    return api.post('/ics/goals/create/')
      .send(json)
      .send({icon: "default.png"})
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreateGoalFailure(err))
        else
          dispatch(requestCreateGoalSuccess(res.body))
          success(res.body.id)
      })
  }
}


function requestCreateGoal() {
  return {
    type: REQUEST_CREATE, 
    name: GOALS
  }
}

function requestCreateGoalFailure(err) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: GOALS,
    error: err,
  }
}

function requestCreateGoalSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: null,
    name: GOALS,
  }
}

export function postDeleteGoal(p, index, callback) {
  return function (dispatch) {
    dispatch(requestDeleteGoal(index))

    return api.del('/ics/goals/', p.id)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestDeleteGoalFailure(index, err))
        else {
          dispatch(requestDeleteGoalSuccess(index))
          callback()
        }
      })
  }
}

function requestDeleteGoal(index) {
  return {
    type: REQUEST_DELETE,
    index: index,
    name: GOALS
  }
}

function requestDeleteGoalFailure(index, err) {
  return {
    type: REQUEST_DELETE_FAILURE,
    index: index,
    name: GOALS,
    error: err
  }
}

function requestDeleteGoalSuccess(index) {
  return {
    type: REQUEST_DELETE_SUCCESS,
    index: index,
    name: GOALS
  }
}

export function pageGoals(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: GOALS

  }
}




