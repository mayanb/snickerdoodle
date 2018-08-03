import api from '../WaffleconeAPI/api.jsx'
import {
  START_ADJUSTMENT,
  ADJUSTMENT_SUCCESS,
  ADJUSTMENT_FAILURE,
} from '../../reducers/InventoryReducerExtension'
import {  INVENTORY } from '../../reducers/ReducerTypes'

export function requestCreateAdjustment(userProfileId, processId, productId, amount, explanation) {
	return dispatch => {
		dispatch(startCreatingAdjustment())
		const data = {
				userprofile: userProfileId,
				process_type: processId,
				product_type: productId,
				amount: amount,
				explanation: explanation
			}
			console.log('data', data)
		return api.post('/ics/adjustments/')
			.send(data)
			.then(res => {
				dispatch(createAdjustmentSuccess(res.body))
			})
			.catch(e => {
				dispatch(createAdjustmentFailure(e))
				console.log(e)
				throw e
			})
	}
}

export function requestUploadCsvFile(file) {
	return dispatch => {
		dispatch(startCreatingAdjustment())

		return api.upload(`/cogs/adjustments/csv/`, file, {})
			.then(res => {
				console.log('res.body: ', res.body)
				res.body.forEach(adjustment => dispatch(createAdjustmentSuccess(adjustment.data)))
			})
			.catch(e => {
				dispatch(createAdjustmentFailure(e))
				console.log(e)
				throw e
			})
	}
}

function startCreatingAdjustment() {
	return {
		type: START_ADJUSTMENT,
		name: INVENTORY,
	}
}

function createAdjustmentSuccess(json) {
	return {
		type: ADJUSTMENT_SUCCESS,
		name: INVENTORY,
		...json
	}
}

function createAdjustmentFailure(err) {
	console.error('Oh no! Something went wrong while saving the adjustment\n' + err)
	return {
		type: ADJUSTMENT_FAILURE,
		name: INVENTORY,
	}
}

