import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  SELECT,
  PAGE,
} from '../../reducers/APIDataReducer'
import {  INVENTORY_2 } from '../../reducers/ReducerTypes'

export function fetchInitialInventory() {
  return dispatch => {
    dispatch(requestInventory())
    return api.get('/ics/tasks/search/')
      .then(({body}) => {
        dispatch(requestInventorySuccess(body.results, body.next))
      })
      .catch(e => {
        dispatch(requestInventoryFailure(e))
        console.log(e)
        throw e
      })
  }
}

export function fetchMoreInventory(page) {
  return dispatch => {
    dispatch(requestInventory())
    return api.get(page)
      .then(({body}) => {
        dispatch(requestInventorySuccess(body.results, body.next, true))
      })
      .catch(e => {
        dispatch(requestInventoryFailure(e))
        console.log(e)
        throw e
      })
  }
}

export function selectInventory(index) {
  return {
    type: SELECT,
    index: index,
    name: INVENTORY_2,
  }
}

export function pageInventory(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: INVENTORY_2
  }
}

function requestInventory() {
  return {
    type: REQUEST,
    name: INVENTORY_2
  }
}

function requestInventoryFailure(err) {
  return {
    type: REQUEST_FAILURE,
    name: INVENTORY_2
  }
}

function requestInventorySuccess(json, more, append=false) {
  console.log(append)
  return {
    type: REQUEST_SUCCESS,
    name: INVENTORY_2,
    data: json,
    more: more,
    append: append,
  }
}


