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
  REQUEST_REORDER,
  REQUEST_REORDER_SUCCESS,
  REQUEST_REORDER_FAILURE,
  SELECT,
  PAGE,
} from '../../reducers/APIDataReducer'
import { GOALS } from '../../reducers/ReducerTypes'
import {WEEKLY, MONTHLY} from './GoalTypes'

export function fetchGoals(user_id) {
  return function (dispatch) {
    // dispatch an action that we are requesting a goal
    dispatch(requestGoals())

    // actually fetch 
    return api.get('/ics/goals/')
      .query({userprofile: user_id})
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestGoalsFailure(err))
        }

        let weekly = res.body.filter(e => e.timerange === WEEKLY)
        dispatch(requestGoalsSuccess(weekly, WEEKLY))

        let monthly = res.body.filter(e => e.timerange === MONTHLY)
        dispatch(requestGoalsSuccess(monthly, MONTHLY))
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

function requestGoalsSuccess(json, timerange) {
  return {
    type: REQUEST_SUCCESS,
    name: GOALS,
    data: json, 
    timerange: timerange
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
    dispatch(requestCreateGoal(json))
    return api.post('/ics/goals/create/')
      .send(json)
      .send({icon: "default.png"})
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreateGoalFailure(err, json))
        else
          dispatch(requestCreateGoalSuccess(res.body))
          //success(res.body.id)
      })
  }
}


function requestCreateGoal(json) {
  return {
    type: REQUEST_CREATE, 
    name: GOALS,
    timerange: json.timerange
  }
}

function requestCreateGoalFailure(err, json) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: GOALS,
    error: err,
    timerange: json.timerange
  }
}

function requestCreateGoalSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: null,
    timerange: json.timerange,
    name: GOALS,
  }
}

export function postDeleteGoal(p, index, timerange) {
  return function (dispatch) {
    dispatch(requestDeleteGoal(index, timerange))

    return api.del('/ics/goals/edit/', p.id)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestDeleteGoalFailure(index, err, timerange))
        else {
          dispatch(requestDeleteGoalSuccess(index, timerange))
          // callback()
        }
      })
  }
}

function requestDeleteGoal(index, timerange) {
  return {
    type: REQUEST_DELETE,
    index: index,
    name: GOALS,
    timerange: timerange,
  }
}

function requestDeleteGoalFailure(index, err, timerange) {
  return {
    type: REQUEST_DELETE_FAILURE,
    index: index,
    name: GOALS,
    error: err,
    timerange: timerange,
  }
}

function requestDeleteGoalSuccess(index, timerange) {
  return {
    type: REQUEST_DELETE_SUCCESS,
    index: index,
    name: GOALS,
    timerange: timerange,
  }
}

export function pageGoals(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: GOALS

  }
}

export function postRequestReorder(goal, new_rank) {
  return function (dispatch) {
    //dispatch(requestMoveAttribute())

    return api.put(`/ics/goals/move/${goal.id}/`)
      .send({new_rank: new_rank})
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestReorderFailure(goal))
        } else {
          dispatch(requestReorderSuccess(goal, new_rank))
        }
      })
  }
}

function requestReorder(goal) {
  return {
    type: REQUEST_REORDER,
    name: GOALS, 
    timerange: goal.timerange,
  }
}

function requestReorderSuccess(goal, new_rank) {
  return {
    type: REQUEST_REORDER_SUCCESS,
    name: GOALS, 
    timerange: goal.timerange,
    id: goal.id,
    new_rank: new_rank
  }
}

function requestReorderFailure(goal) {
  return {
    type: REQUEST_REORDER_FAILURE,
    name: GOALS,
    timerange: goal.timerange
  }
}





