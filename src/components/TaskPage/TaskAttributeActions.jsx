import api from '../WaffleconeAPI/api.jsx'
import { TASK } from '../../reducers/ReducerTypes'
import {
  REQUEST_SAVE_ATTRIBUTE,
  REQUEST_SAVE_ATTRIBUTE_SUCCESS, 
  REQUEST_SAVE_ATTRIBUTE_FAILURE
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

// PATCH-es taskAttribute (ie non-recurring task). params = {taskAttributeID, task, value}
export function saveEditingAttribute(index, params) {
	return function (dispatch) {
		dispatch(requestSaveAttribute(index, params))

		return api.patch(`/ics/taskAttributes/${params.taskAttributeID}/`)
			.send({value: params.value})
			.then(res => {
				dispatch(requestSaveAttributeSuccess(index, params))
			})
			.catch(e => {
				console.log(e)
				dispatch(requestSaveAttributeFailure(index, params))
				throw e
			})
	}

}