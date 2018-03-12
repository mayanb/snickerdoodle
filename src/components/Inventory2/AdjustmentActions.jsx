import api from '../WaffleconeAPI/api.jsx'
import {
  START_ADJUSTMENT,
  ADJUSTMENT_SUCCESS,
  ADJUSTMENT_FAILURE,
} from '../../reducers/Inventory2ReducerExtension'
import {  INVENTORY_2 } from '../../reducers/ReducerTypes'

export function requestCreateAdjustment(userId, processId, productId, amount) {
	return dispatch => {
		dispatch(startCreatingAdjustment())
		const data = {
				created_by: userId,
				process_type: processId,
				product_type: productId,
				amount: amount
			}
			console.log('data', data)
		return api.post('/ics/adjustments/')
			.send(data)
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

