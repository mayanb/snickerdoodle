import update from 'immutability-helper'

export const REQUEST_TRENDS = 'REQUEST_PRODUCTION_TRENDS'
export const REQUEST_TRENDS_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_TRENDS_FAILURE = 'REQUEST_TRENDS_FAILURE'

export default function productionTrendsReducer(state, action) {
	switch (action.type) {
		case REQUEST_TRENDS:
			return request(state, action)
		case REQUEST_TRENDS_SUCCESS:
			return requestSuccess(state, action)
		case REQUEST_TRENDS_FAILURE:
			return requestFailure(state, action)
		default:
			return state
	}
}

function request(state, action) {
	return update(state, {
		[action.query]: {
			ui: {
				isFetchingData: {
					$set: true
				}
			}
		}
	})
}

function requestSuccess(state, action) {
	return update(state, {
		[action.query]: {
			ui: {
				$merge: {
					isFetchingData: false,
				}
			},
			data: {
				$set: action.data
			}
		}
	})
}

function requestFailure(state, action) {
	return update(state, {
		[action.query]: {
			ui: {
				$merge: {
					isFetchingData: false,
					error: action.error
				}
			},
		}
	})
}

