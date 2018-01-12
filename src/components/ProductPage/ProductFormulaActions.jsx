import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  // REQUEST_CREATE_FAILURE,
  REQUEST_DELETE,
  REQUEST_DELETE_SUCCESS,
  REQUEST_DELETE_FAILURE,
} from '../../reducers/APIDataReducer'
import {START_ADDING_FORMULA, ADD_SECTION} from '../../reducers/FormulaReducerExtension'
import { FORMULAS } from '../../reducers/ReducerTypes'

// let data = [
//   { attribute: {process_type: 1, process_type_name: 'Roast', name: 'Temperature (F)', datatype: 'Number'}, formula: '10', comparator: '<'},
//   { attribute: {process_type: 1, process_type_name: 'Roast', name: 'Start time', datatype: 'Number'}, formula: '15', comparator: '<'}
// ]


export function fetchFormulas(q) {
  return function (dispatch) {
    dispatch(requestFormulas())

    // actually fetch 
    return api.get('/ics/formula-attributes/')
      .query(q)
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

export function postCreateFormula(json) {
  return function (dispatch) {
    dispatch(requestCreate(json))

    //actually fetch 
    return api.post('/ics/formula-attributes/create/')
      .send(json)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(requestCreateFailure(err))
        } else {
          dispatch(finishAddingFormula())
          dispatch(requestCreateSuccess(res.body))
        }
      })
  }
}

function requestCreate(json) {
  return {
    type: REQUEST_CREATE,
    name: FORMULAS,
    item: json
  }
}

function requestCreateSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    name: FORMULAS,
    item: json
  }
}

function requestCreateFailure(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    name: FORMULAS,
    item: json
  }
}


export function startAddingFormula(process_type) {
  return {
    type: START_ADDING_FORMULA,
    name: FORMULAS,
    process_type: process_type
  }
}

export function finishAddingFormula() {
  return {
    type: START_ADDING_FORMULA,
    name: FORMULAS,
    process_type: null
  }
}

export function addSection(process_type) {
  return {
    type: ADD_SECTION,
    name: FORMULAS,
    process_type: process_type    
  }
}

export function postDeleteFormula(formulaId, index, callback) {
	return function (dispatch) {
		dispatch(requestDeleteFormula())

		return api.put(`/ics/formula-attributes/delete/${formulaId}/`)
			.send()
			.end(function (err, res) {
				if (err || !res.ok)
					dispatch(requestDeleteFormulaFailure(err))
				else {
					dispatch(requestDeleteFormulaSuccess(index))
					callback()
				}
			})
	}
}

function requestDeleteFormula() {
	return {
		type: REQUEST_DELETE,
		name: FORMULAS
	}
}

function requestDeleteFormulaFailure(err) {
	return {
		type: REQUEST_DELETE_FAILURE,
		name: FORMULAS,
		error: err
	}
}

function requestDeleteFormulaSuccess(index) {
	return {
		type: REQUEST_DELETE_SUCCESS,
		index: index,
		name: FORMULAS,
	}
}
