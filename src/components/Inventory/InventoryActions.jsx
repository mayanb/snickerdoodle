import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  SELECT,
  PAGE,
	RESET_PAGE,
} from '../../reducers/APIDataReducer'
import {
	REQUEST_HISTORY,
	REQUEST_HISTORY_SUCCESS,
	REQUEST_HISTORY_FAILURE,
} from '../../reducers/InventoryReducerExtension'

import {  INVENTORY } from '../../reducers/ReducerTypes'

export function fetchInitialInventory(processIds, productIds, ordering) {
  return dispatch => {
    dispatch(requestInventory())
	  const query = {
		  ordering: ordering
	  }
	  if(processIds.length)
	  	query.process_types = processIds.join(',')
	  if(productIds.length)
		  query.product_types = productIds.join(',')
	  return api.get('/ics/inventories/')
		  .query(query)
		  .then(({ body }) => {
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
    name: INVENTORY,
  }
}

export function pageInventory(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: INVENTORY
  }
}

export function resetPageInventory() {
	return {
		type: RESET_PAGE,
		name: INVENTORY
	}
}

function requestInventory() {
  return {
    type: REQUEST,
    name: INVENTORY
  }
}

function requestInventoryFailure(err) {
  return {
    type: REQUEST_FAILURE,
    name: INVENTORY
  }
}

function requestInventorySuccess(json, more, append=false) {
  return {
    type: REQUEST_SUCCESS,
    name: INVENTORY,
    data: json,
    more: more,
    append: append,
  }
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


