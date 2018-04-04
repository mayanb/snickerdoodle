import api from '../WaffleconeAPI/api.jsx'
import { TASK } from '../../reducers/ReducerTypes'
import {
  START_EDITING_ATTRIBUTE,
  FINISH_EDITING_ATTRIBUTE,
  REQUEST_SAVE_ATTRIBUTE, 
  REQUEST_SAVE_ATTRIBUTE_SUCCESS, 
  REQUEST_SAVE_ATTRIBUTE_FAILURE
} from '../../reducers/TaskAttributeReducerExtension'

export function startEditingAttribute(index) {
  return {
    type: START_EDITING_ATTRIBUTE,
    name: TASK,
    index: index
  }
}

export function finishEditingAttribute(index) {
	return {
		type: FINISH_EDITING_ATTRIBUTE,
		name: TASK
	}
}

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

// params should have attribute, task, value
export function saveEditingAttribute(index, params, success, failure) {
	return function (dispatch) {
		dispatch(requestSaveAttribute(index, params))

		return api.post('/ics/taskAttributes/create/')
			.send(params)
			.then(res => {
				if(success)
					success()
				return dispatch(requestSaveAttributeSuccess(index, params))
			})
			.catch(e => {
				if(failure)
					failure()
				return dispatch(requestSaveAttributeFailure(index, params))
			})
	}

}