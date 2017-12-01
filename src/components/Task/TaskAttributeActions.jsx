import api from '../WaffleconeAPI/api.jsx'
import moment from 'moment'
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

		api.post('/ics/taskAttributes/')
			.send(params)
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestSaveAttributeFailure(index, params))
					if (failure) 
						failure()
				} else {
					dispatch(requestSaveAttributeSuccess(index, params))
					if (success)
						success()
				}
			})
	}

}