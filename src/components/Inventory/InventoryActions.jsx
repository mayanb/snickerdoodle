import {
	REQUEST_HISTORY,
	REQUEST_HISTORY_SUCCESS,
	REQUEST_HISTORY_FAILURE,
	REQUEST_AGGREGATE,
	REQUEST_AGGREGATE_SUCCESS,
	REQUEST_AGGREGATE_FAILURE,
} from '../../reducers/InventoryReducerExtension'
import api from '../WaffleconeAPI/api.jsx'
import * as actions from '../../reducers/APIDataActions'
import {  INVENTORY } from '../../reducers/ReducerTypes'

export function fetchInventory(params) {
	const request = {
		url: '/ics/inventories/',
		query: params
	}
	return actions.fetchPaginated(INVENTORY, request, null, res => res.body, false)
}

export function fetchMoreInventory(page) {
  let request = {
    url: page,
    query: {}
  }
  return actions.fetchPaginated(INVENTORY, request, null, res => res.body, true)
}

export function fetchAggregate(params) {
  return dispatch => {
    dispatch(requestAggregate())
    return api.get('/ics/inventories/aggregate/')
      .query(params)
      .then(res => dispatch(requestAggregateSuccess(res.body)))
      .catch(err => dispatch(requestAggregateFailure(err)))
  }
}

export function selectInventory(index) {
  return actions.select(INVENTORY, index)
}

export function pageInventory(direction) {
  return actions.page(INVENTORY, direction)
}

export function resetPageInventory() {
	return actions.resetPage(INVENTORY)
}

export function fetchInventoryHistory(teamId, processId, productId) {
	return function (dispatch) {
		dispatch(requestInventoryHistory())
		return api.get('/ics/adjustment-history/')
			.query({ process_type: processId, product_type: productId, team: teamId })
			.then(res => dispatch(requestInventoryHistorySuccess(res.body, processId, productId)))
			.catch(err => dispatch(requestInventoryHistoryFailure(err)))
	}
}

function requestInventoryHistory() {
	return {
		name: INVENTORY,
		type: REQUEST_HISTORY
	}
}

function requestInventoryHistorySuccess(json, processId, productId) {
	return {
		type: REQUEST_HISTORY_SUCCESS,
		data: json,
		name: INVENTORY,
		processId: processId,
		productId: productId,
	}
}

function requestInventoryHistoryFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_HISTORY_FAILURE,
		name: INVENTORY,
	}
}

function requestAggregate() {
	return {
		type: REQUEST_AGGREGATE,
		name: INVENTORY,
	}
}

function requestAggregateSuccess(json) {
	return {
		type: REQUEST_AGGREGATE_SUCCESS,
		name: INVENTORY,
		data: json,
	}
}

function requestAggregateFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_AGGREGATE_FAILURE,
		name: INVENTORY,
	}
}
