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
} from '../../reducers/APIDataReducer'
import {  PACKING_ORDER, ORDER_ITEMS } from '../../reducers/ReducerTypes'


export function getPackingOrder(id) {
  console.log("getting packing order")
  return function (dispatch) {
    console.log("getting packing order")
    // dispatch an action that we are requesting a process
    dispatch(requestPackingOrders(id))

    // actually fetch 
    return api.get(`/ics/orders/${id}/`)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestPackingOrdersFailure(err))
        } else {
          let packingOrders = res.body
          console.log(packingOrders)
          let inventoryunits = packingOrders.order_inventory_units
          const copy = [];
          inventoryunits.forEach(function(item){
            let item_copy = item
            item_copy['name'] = item['inventory_unit']['process']['name'] + "_" + item['inventory_unit']['product']['name']
            copy.push(item_copy)
          });
          packingOrders.order_inventory_units = copy
          console.log(packingOrders)
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

export function pagePackingOrder(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: PACKING_ORDER
  }
}

export function getOrderItems(id) {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestOrderItems(id))

    // actually fetch 
    return api.get(`/ics/orderitems/`)
      .query({order: id})
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestOrderItemsFailure(err))
        } else {
          let orderItems = res.body
          dispatch(requestOrderItemsSuccess(orderItems))
        }
      })
  }
}

function requestOrderItems() {
  return {
    name: ORDER_ITEMS,
    type: REQUEST
  }
}

function requestOrderItemsFailure(err) {
  return {
    name: ORDER_ITEMS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestOrderItemsSuccess(json) {
  return {
    name: ORDER_ITEMS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function pageOrderItems(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: ORDER_ITEMS
  }
}

export function selectOrderItems(id) {
  return {
    type: SELECT,
    index: id,
    name: ORDER_ITEMS
  }
}



