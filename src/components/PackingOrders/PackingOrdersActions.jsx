import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  PAGE,
  REQUEST_CREATE, 
  REQUEST_CREATE_FAILURE,
  REQUEST_CREATE_SUCCESS
} from '../../Reducers/APIDataReducer'
import {  PACKING_ORDERS, CONTACTS } from '../../Reducers/ReducerTypes'


export function fetchPackingOrders() {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestPackingOrders())

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
    name: PACKING_ORDERS,
    type: REQUEST
  }
}

function requestPackingOrdersFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: PACKING_ORDERS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestPackingOrdersSuccess(json) {
  return {
    name: PACKING_ORDERS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function pagePackingOrders(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: PACKING_ORDERS
  }
}


export function fetchContacts() {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestContacts())

    // actually fetch 
    return api.get('/ics/contacts/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestContactsFailure(err))
        } else {
          let packingOrders = res.body
          dispatch(requestContactsSuccess(packingOrders))
        }
      })
  }
}

function requestContacts() {
  console.log("requesting packing orders")
  return {
    name: CONTACTS,
    type: REQUEST
  }
}

function requestContactsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: CONTACTS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestContactsSuccess(json) {
  return {
    name: CONTACTS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function postCreatePackingOrder(json) {
  return function (dispatch) {
    dispatch(requestCreatePackingOrder())
    return api.post('/ics/packingorder/create/')
      .send(json)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreatePackingOrderFailure(err))
        else
          dispatch(requestCreatePackingOrderSuccess(res.body))
          //success(res.body.id)
      })
  }
}


function requestCreatePackingOrder() {
  return {
    type: REQUEST_CREATE, 
    name: PACKING_ORDERS
  }
}

function requestCreatePackingOrderFailure(err) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: PACKING_ORDERS,
    error: err,
  }
}

function requestCreatePackingOrderSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: null,
    name: PACKING_ORDERS,
  }
}


