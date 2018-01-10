import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  REQUEST_DELETE,
  REQUEST_DELETE_SUCCESS,
  REQUEST_DELETE_FAILURE,
  REQUEST_EDIT,
  REQUEST_EDIT_SUCCESS,
  REQUEST_EDIT_ITEM,
  REQUEST_EDIT_ITEM_SUCCESS,
  REQUEST_EDIT_ITEM_FAILURE,
  SELECT,
  PAGE,
} from '../../reducers/APIDataReducer'
import { FORMULAS } from '../../reducers/ReducerTypes'
import {findPosition, alphabetize} from '../../utilities/arrayutils.jsx'


export function fetchFormulas() {
  return function (dispatch) {
    dispatch(requestFormulas())

    // actually fetch 
    return api.get('/ics/formula-attributes/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestFormulasError(err))
        } else {
          dispatch(requestFormulasSuccess(res.body))
        }
      })
  }
}

function requestFormulas() {
  return {
    type: REQUEST,
    name: FORMULAS
  }
}

function requestFormulasError(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: FORMULAS

  }
}

function requestFormulasSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    name: FORMULAS,
    data: json, 
  }
}
