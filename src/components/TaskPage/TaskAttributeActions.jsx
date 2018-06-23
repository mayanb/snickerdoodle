import api from '../WaffleconeAPI/api.jsx'
import { TASK } from '../../reducers/ReducerTypes'
import {
  REQUEST_SAVE_ATTRIBUTE,
  REQUEST_SAVE_ATTRIBUTE_SUCCESS, 
  REQUEST_SAVE_ATTRIBUTE_FAILURE,
	REQUEST_CREATE_ATTRIBUTE_SUCCESS,
} from '../../reducers/TaskAttributeReducerExtension'


export function requestSaveAttribute(index, params) {
	return {
		type: REQUEST_SAVE_ATTRIBUTE,
		name: TASK,
		index: index,
		params: params
	}
}

export function requestSaveAttributeSuccess(index, params) {
	return {
		type: REQUEST_SAVE_ATTRIBUTE_SUCCESS,
		name: TASK,
		index: index,
		params: params
	}
}

export function requestSaveAttributeFailure(index, params) {
	return {
		type: REQUEST_SAVE_ATTRIBUTE_FAILURE,
		name: TASK,
		index: index,
		params: params,

	}
}

export function requestCreateAttributeSuccess(index, params, newTaskAttribute) {
	return {
		type: REQUEST_CREATE_ATTRIBUTE_SUCCESS,
		name: TASK,
		index: index,
		params: params,
		newTaskAttribute: newTaskAttribute,
	}
}

// PATCH-es taskAttribute. params = {taskAttributeID, task, value}
export function saveEditingAttribute(index, params) {
	return function (dispatch) {
		dispatch(requestSaveAttribute(index, params))

		return api.patch(`/ics/taskAttributes/${params.taskAttributeID}/`)
			.send({value: params.value})
			.then(res => {
				dispatch(requestSaveAttributeSuccess(index, params))
			})
			.catch(e => {
				dispatch(requestSaveAttributeFailure(index, params))
				throw e
			})
	}
}

// Create new taskAttribute. params = { attribute, task, value }
export function createEditingAttribute(index, params) {
	return function (dispatch) {
		dispatch(requestSaveAttribute(index, params))
		
		return api.post(`/ics/taskAttributes/`)
			.send(params)
			.then(res => {
				console.log('yay, saved', res.body)
				dispatch(requestCreateAttributeSuccess(index, params, res.body))
			})
			.catch(e => {
				dispatch(requestSaveAttributeFailure(index, params))
				throw e
			})
	}
}