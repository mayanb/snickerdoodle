import {
	REQUEST_HISTORY,
	REQUEST_HISTORY_SUCCESS,
	REQUEST_HISTORY_FAILURE,
} from '../../reducers/InventoryReducerExtension'
import api from '../WaffleconeAPI/api.jsx'
import * as actions from '../../reducers/APIDataActions'
import {  INVENTORY } from '../../reducers/ReducerTypes'

export function fetchInitialInventory(processIds, productIds, categoryCodes, ordering) {
  const query = {
    ordering: ordering
  }
	if(processIds.length) {
		query.process_types = processIds.join(',')
	}
	if(productIds.length) {
		query.product_types = productIds.join(',')
	}
	if(categoryCodes.length){
		query.category_types = categoryCodes.join(',')
	}
  let request = {
    url: '/ics/inventories/',
    query: query
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

function requestInventoryHistoryFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_HISTORY_FAILURE,
		name: INVENTORY,
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


