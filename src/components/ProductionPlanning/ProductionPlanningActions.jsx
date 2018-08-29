import {
    REQUEST_IN_PROGRESS_INVENTORY,
    REQUEST_IN_PROGRESS_INVENTORY_SUCCESS,
    REQUEST_IN_PROGRESS_INVENTORY_FAILURE,
    REQUEST_REMAINING_RAW_MATERIALS,
    REQUEST_REMAINING_RAW_MATERIALS_SUCCESS,
    REQUEST_REMAINING_RAW_MATERIALS_FAILURE,
} from '../../reducers/ProductionPlanningReducerExtension'
import api from '../WaffleconeAPI/api.jsx'
import { PRODUCTION_PLANNING } from '../../reducers/ReducerTypes'

export function fetchInProgressInventory(processId, productId, ordering) {
    return function (dispatch) {
        dispatch(requestInProgressInventory())
        return api.get('/ics/production-planning/')
			.query({ process: processId, product: productId, type: 'in-progress', ordering })
			.then(res => dispatch(requestInProgressInventorySuccess(res.body, processId, productId)))
			.catch(err => dispatch(requestInProgressInventoryFailure(err)))
    }
}

export function fetchRemainingRawMaterials(processId, productId, ordering) {
    return function (dispatch) {
        dispatch(requestRemainingRawMaterials())
        return api.get('/ics/production-planning/')
			.query({ process: processId, product: productId, type: 'raw-materials', ordering })
			.then(res => dispatch(requestRemainingRawMaterialsSuccess(res.body, processId, productId)))
			.catch(err => dispatch(requestRemainingRawMaterialsFailure(err)))
    }
}

function requestInProgressInventory() {
	return {
        type: REQUEST_IN_PROGRESS_INVENTORY,
		name: PRODUCTION_PLANNING,
	}
}

function requestInProgressInventorySuccess(json, processId, productId) {
	return {
		type: REQUEST_IN_PROGRESS_INVENTORY_SUCCESS,
        name: PRODUCTION_PLANNING,
        data: json,
		processId,
        productId,
	}
}

function requestInProgressInventoryFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_IN_PROGRESS_INVENTORY_FAILURE,
		name: PRODUCTION_PLANNING,
	}
}

function requestRemainingRawMaterials() {
	return {
        type: REQUEST_REMAINING_RAW_MATERIALS,
		name: PRODUCTION_PLANNING,
	}
}

function requestRemainingRawMaterialsSuccess(json, processId, productId) {
	return {
		type: REQUEST_REMAINING_RAW_MATERIALS_SUCCESS,
        name: PRODUCTION_PLANNING,
        data: json,
		processId,
        productId,
	}
}

function requestRemainingRawMaterialsFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_REMAINING_RAW_MATERIALS_FAILURE,
		name: PRODUCTION_PLANNING,
	}
}