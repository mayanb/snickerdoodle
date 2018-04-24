import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST_INVENTORY,
	REQUEST_INVENTORY_SUCCESS,
	REQUEST_INVENTORY_FAILURE,
  REQUEST_ITEMS,
  REQUEST_ITEMS_SUCCESS,
  REQUEST_ITEMS_FAILURE
} from '../../reducers/InventoryReducer'
import { INVENTORIES } from '../../reducers/ReducerTypes'


export function fetchInventory() {
  return function (dispatch) {
    dispatch(requestInventory())
	  return api.get('/ics/inventory/')
		  .then(res => dispatch(requestInventorySuccess(res.body)))
		  .catch(err => dispatch(requestInventoryFailure(err)))
  }
}

function requestInventory() {
  return {
    name: INVENTORIES,
    type: REQUEST_INVENTORY
  }
}

function requestInventoryFailure(err) {
  console.error('Oh no! Something went wrong\n' + err)
  console.log(err)
  return {
    type: REQUEST_INVENTORY_FAILURE,
    name: INVENTORIES,
  }
}

function requestInventorySuccess(json) {
  return {
    type: REQUEST_INVENTORY_SUCCESS,
    data: json,
    name: INVENTORIES,
  }
}

export function fetchInventoryItems(processId) {
  return function (dispatch) {
    dispatch(requestInventoryItems())
    return api.get('/ics/inventory/detail-test/')
      .query({ process: processId })
	    .then(res => dispatch(requestInventoryItemsSuccess(res.body, processId)))
	    .catch(err => dispatch(requestInventoryItemsFailure(err)))
  }
}

function requestInventoryItems() {
  return {
    name: INVENTORIES,
    type: REQUEST_ITEMS
  }
}

function requestInventoryItemsFailure(err) {
  console.error('Oh no! Something went wrong\n' + err)
  console.log(err)
  return {
    type: REQUEST_ITEMS_FAILURE,
    name: INVENTORIES,
  }
}

function requestInventoryItemsSuccess(json, processId) {
  return {
    type: REQUEST_ITEMS_SUCCESS,
    data: json,
    name: INVENTORIES,
    processId: processId
  }
}