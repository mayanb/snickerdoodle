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
} from '../../reducers/APIDataReducer'
import {  PACKING_ORDERS, CONTACTS, INVENTORY_UNITS } from '../../reducers/ReducerTypes'


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
          packingOrders = packingOrders.sort(sort_packingorders)
          dispatch(requestPackingOrdersSuccess(packingOrders))
        }
      })
  }
}

function requestPackingOrders() {
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

export function selectPackingOrder(id) {
  return {
    type: SELECT,
    index: id,
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

export function fetchInventoryUnits() {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestInventoryUnits())

    // actually fetch 
    return api.get('/ics/inventoryunits/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestInventoryUnitsFailure(err))
        } else {
          let inventoryunits = res.body
          const copy = [];
          inventoryunits.forEach(function(item){
            let item_copy = item
            item_copy['name'] = item['process']['name'] + "_" + item['product']['name']
            copy.push(item_copy)
          });
          dispatch(requestInventoryUnitsSuccess(copy))
        }
      })
  }
}

function requestInventoryUnits() {
  return {
    name: INVENTORY_UNITS,
    type: REQUEST
  }
}

function requestInventoryUnitsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: INVENTORY_UNITS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestInventoryUnitsSuccess(json) {
  return {
    name: INVENTORY_UNITS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}

export function postCreatePackingOrder(json, success) {
  return function (dispatch) {
    dispatch(requestCreatePackingOrder())
    return api.post('/ics/packingorder/create/')
      .send(json)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreatePackingOrderFailure(err))
        else
          dispatch(requestCreatePackingOrderSuccess(res.body))
          // success(res.body.id)
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
    sort: sort_packingorders,
    name: PACKING_ORDERS,
  }
}

export function sort_packingorders(a, b) {
  if (a == b || a==null || b==null) 
    return 0

  let aTime = a.created_at
  let bTime = b.created_at

  if (aTime < bTime) 
    return 1
  if (aTime > bTime)
    return -1

  return 0
}


