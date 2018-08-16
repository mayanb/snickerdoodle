import {
    REQUEST_ANCESTORS_INVENTORY,
    REQUEST_ANCESTORS_INVENTORY_SUCCESS,
    REQUEST_ANCESTORS_INVENTORY_FAILURE,
    REQUEST_REMAINING_INVENTORY,
    REQUEST_REMAINING_INVENTORY_SUCCESS,
    REQUEST_REMAINING_INVENTORY_FAILURE,
} from '../../reducers/ProductionPlanningReducerExtension'
import api from '../WaffleconeAPI/api.jsx'
import * as actions from '../../reducers/APIDataActions'
import { PRODUCTION_PLANNING } from '../../reducers/ReducerTypes'

export function fetchAncestorsInventory(processId, productId, category, ordering) {
    return function (dispatch) {
        dispatch(requestAncestorsInventory)
        return api.get('/ics/inventory/ancestors/')
			.query({ process: processId, product: productId, ancestor_category: category, ordering })
			.then(res => {console.log('SERVER RESPONSE (ANCESTORS)', res.body); dispatch(requestAncestorsInventorySuccess(res.body, processId, productId, category))})
			.catch(err => dispatch(requestAncestorsInventoryFailure(err)))
    }
}

export function fetchRemainingInventory(processId, productId, category, ordering) {
    return function (dispatch) {
        dispatch(requestRemainingInventory)
        return api.get('/ics/inventory/remaining/')
			.query({ process: processId, product: productId, ancestor_category: category, ordering })
			.then(res => {console.log('SERVER RESPONSE (REMAINING)', res.body); dispatch(requestRemainingInventorySuccess(res.body, processId, productId, category))})
			.catch(err => dispatch(requestRemainingInventoryFailure(err)))
    }
}

function requestAncestorsInventory() {
	return {
        type: REQUEST_ANCESTORS_INVENTORY,
		name: PRODUCTION_PLANNING,
	}
}

function requestAncestorsInventorySuccess(json, processId, productId, category) {
	return {
		type: REQUEST_ANCESTORS_INVENTORY_SUCCESS,
        name: PRODUCTION_PLANNING,
        data: json,
		processId,
        productId,
        category
	}
}

function requestAncestorsInventoryFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_ANCESTORS_INVENTORY_FAILURE,
		name: PRODUCTION_PLANNING,
	}
}

function requestRemainingInventory() {
	return {
        type: REQUEST_REMAINING_INVENTORY,
		name: PRODUCTION_PLANNING,
	}
}

function requestRemainingInventorySuccess(json, processId, productId, category) {
	return {
		type: REQUEST_REMAINING_INVENTORY_SUCCESS,
        name: PRODUCTION_PLANNING,
        data: json,
		processId,
        productId,
        category
	}
}

function requestRemainingInventoryFailure(err) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_REMAINING_INVENTORY_FAILURE,
		name: PRODUCTION_PLANNING,
	}
}