import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../Reducers/APIDataReducer'
import {  PACKING_ORDERS } from '../../Reducers/ReducerTypes'


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


