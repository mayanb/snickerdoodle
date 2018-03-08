import api from '../WaffleconeAPI/api.jsx'
import {
  START_ADJUSTMENT,
  ADJUSTMENT_SUCCESS,
  ADJUSTMENT_FAILURE,
  REQUEST_HISTORY,
  HISTORY_SUCCESS,
  HISTORY_FAILURE,
} from '../../reducers/Inventory2Reducer'
import {  INVENTORY_2 } from '../../reducers/ReducerTypes'

export function requestCreateAdjustment(payload) {
	return dispatch => {
		dispatch(startCreatingAdjustment())
		api.post('ics/adjustments/')
			.send(payload)
			.then(res => {
				dispatch(createAdjustmentSuccess(res.body))
			})
			.catch(e => {
				dispatch(createAdjustmentFailure())
				console.log(e)
				throw e
			})
	}
}

function startCreatingAdjustment() {
	return {
		type: START_ADJUSTMENT,
		name: INVENTORY_2,
	}
}

function createAdjustmentSuccess(json) {
	return {
		type: ADJUSTMENT_SUCCESS,
		name: INVENTORY_2,
		...json
	}
}

function createAdjustmentFailure() {
	return {
		type: ADJUSTMENT_FAILURE,
		name: INVENTORY_2,
	}
}


export function requestHistory(payload) {
	// TODO - is all of this ok?
	return dispatch => {
		dispatch(startRequestingHistory())
		api.post('ics/adjustment-history')
			.send(payload)
			.then(res => {
				dispatch(historySuccess(res.body, payload.process_type, payload.product_type))
			})
			.catch(e => {
				dispatch(historyFailure())
				console.log(e)
				throw e
			})
	}
} 

function startRequestingHistory() {
	return {
		type: REQUEST_HISTORY,
		name: INVENTORY_2,
	}
}

function historySuccess(json, proc, prod) {
	return {
		type: HISTORY_SUCCESS,
		name: INVENTORY_2,
		history: json,
		process_type: proc,
		product_type: prod,
	}
}

function historyFailure() {
	return {
		type: HISTORY_FAILURE,
		name: INVENTORY_2,
	}
}
