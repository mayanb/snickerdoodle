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
} from '../../reducers/Inventory2ReducerExtension'

import {  INVENTORY_2 } from '../../reducers/ReducerTypes'

export function fetchInitialInventory(processId, productId) {
  return dispatch => {
    dispatch(requestInventory())
	  const query = {}
	  if(processId)
	  	query.process_type = processId
	  if(productId)
		  query.product_type = productId
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

export function resetPageInventory(direction) {
	return {
		type: RESET_PAGE,
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
  return {
    type: REQUEST_SUCCESS,
    name: INVENTORY_2,
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
		name: INVENTORY_2,
		type: REQUEST_HISTORY
	}
}

function requestInventoryHistoryFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_HISTORY_FAILURE,
		name: INVENTORY_2,
	}
}

function requestInventoryHistorySuccess(json, processId, productId) {
	return {
		type: REQUEST_HISTORY_SUCCESS,
		data: json,
		name: INVENTORY_2,
		processId: processId,
		productId: productId,
	}
}


