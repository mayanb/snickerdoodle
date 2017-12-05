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
} from '../../reducers/APIDataReducer'
import { GRAPHS } from '../../reducers/ReducerTypes'

export function getProcessCooccurrence(team_id) {
  return function (dispatch) {
    console.log("in the action")
    // dispatch an action that we are requesting a goal
    dispatch(requestGraph())

    // actually fetch 
    return api.get('/graphs/get-process-coocurrence/')
      // .send({user_profile: user_id})
      // .query({team: team_id})
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestGraphFailure(err))
        } else {
          console.log(res)
          dispatch(requestGraphSuccess(JSON.parse(res.text)))
        }
      })
  }
}

function requestGraph() {
  return {
    type: REQUEST,
    name: GRAPHS
  }
}

function requestGraphFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: GRAPHS

  }
}

function requestGraphSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    name: GRAPHS,
    data: json, 
  }
}

