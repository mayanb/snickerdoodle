import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  PAGE,
  SELECT,
  REQUEST_DELETE,
  REQUEST_DELETE_SUCCESS,
} from '../../Reducers/APIDataReducer'
import {  PACKING_ORDER } from '../../Reducers/ReducerTypes'


export function getPackingOrder(id) {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestPackingOrders(id))

    // actually fetch 
    return api.get('/ics/orders/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestPackingOrdersFailure(err))
        } else {
          let packingOrders = res.body
          dispatch(requestPackingOrdersSuccess(packingOrders))
        }
      })
  }
}

function requestPackingOrders() {
  console.log("requesting packing orders")
  return {
    name: PACKING_ORDER,
    type: REQUEST
  }
}

function requestPackingOrdersFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: PACKING_ORDER,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestPackingOrdersSuccess(json) {
  return {
    name: PACKING_ORDER,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function pagePackingOrders(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: PACKING_ORDER
  }
}

export function selectPackingOrder(id) {
  return {
    type: SELECT,
    index: id,
    name: PACKING_ORDER
  }
}



export function deletePackingOrder(id) {
  console.log("delete")
  return function (dispatch) {
    dispatch((requestDeletePackingOrder()))
    return api.delete(`/ics/orders/edit/${id}/`)
      .end(function (err, res) {
        if (err || !res.ok) {
          //dispatch(requestEditTaskFailure(err))
        } else {
          dispatch(requestDeletePackingOrderSuccess())
          //dispatch(requestEditTaskSuccessExtension(index))
        }
      })
  }
}


function requestDeletePackingOrder() {
  return {
    type: REQUEST_DELETE,
    name: PACKING_ORDER

  }
}

function requestDeletePackingOrderSuccess() {
  return {
    type: REQUEST_DELETE_SUCCESS,
    name: PACKING_ORDER,
    index: 0,
  }
}

