import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../reducers/APIDataReducer'
import {  PRODUCTION_TRENDS } from '../../reducers/ReducerTypes'


export function fetchProductionTrends(q) {
  return function (dispatch) {
    dispatch(requestProductionTrends())

    return api.get('/graphs/production-actuals/')
	    .query(q)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestProductionTrendsFailure(err))
        } else {
          dispatch(requestProductionTrendsSuccess(res.body))
        }
      })
  }
}

function requestProductionTrends() {
  return {
    type: REQUEST,
    name: PRODUCTION_TRENDS
  }
}

function requestProductionTrendsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: PRODUCTION_TRENDS

  }
}

function requestProductionTrendsSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    name: PRODUCTION_TRENDS,
    data: json, 
  }
}

