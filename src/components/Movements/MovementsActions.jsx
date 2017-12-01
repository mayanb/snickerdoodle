import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import {  MOVEMENTS } from '../../reducers/ReducerTypes'


export function fetchMovements() {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestMovements())

    // actually fetch 
    return api.get('/ics/processes/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestMovementsFailure(err))
        } else {
          let movements = res.body
          dispatch(requestMovementsSuccess(movements))
        }
      })
  }
}

function requestMovements() {
  console.log("requesting movements")
  return {
    name: MOVEMENTS,
    type: REQUEST
  }
}

function requestMovementsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: MOVEMENTS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestMovementsSuccess(json) {
  return {
    name: MOVEMENTS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


