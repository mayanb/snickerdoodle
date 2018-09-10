import {
	REQUEST_PRODUCTION_PLANNING,
	REQUEST_PRODUCTION_PLANNING_SUCCESS,
	REQUEST_PRODUCTION_PLANNING_FAILURE,
} from '../../reducers/ProductionPlanningReducerExtension'
import api from '../WaffleconeAPI/api.jsx'
import { PRODUCTION_PLANNING } from '../../reducers/ReducerTypes'

export function fetchProductionPlanning(process, product, ordering) {
    return function (dispatch) {
		const timestamp = Date.now()
        dispatch(requestProductionPlanning(timestamp))
        return api.get('/ics/production-planning/')
			.query({ process, product })
			.then(res => dispatch(requestProductionPlanningSuccess(res.body, ordering, timestamp)))
			.catch(err => dispatch(requestProductionPlanningFailure(err, timestamp)))
    }
}

function requestProductionPlanning(timestamp) {
	return {
        type: REQUEST_PRODUCTION_PLANNING,
		name: PRODUCTION_PLANNING,
		timestamp,
	}
}

function requestProductionPlanningSuccess(json, ordering, timestamp) {
	return {
		type: REQUEST_PRODUCTION_PLANNING_SUCCESS,
        name: PRODUCTION_PLANNING,
		data: json,
		ordering,
		timestamp,
	}
}

function requestProductionPlanningFailure(err, timestamp) {
	console.error('Oh no! Something went wrong\n' + err)
	return {
		type: REQUEST_PRODUCTION_PLANNING_FAILURE,
		name: PRODUCTION_PLANNING,
		timestamp,
	}
}