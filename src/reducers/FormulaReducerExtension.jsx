import update from 'immutability-helper'
import {apiDataReducer} from './APIDataReducer'

export const START_ADDING_FORMULA = 'START_ADDING_FORMULA'


export function _formula(state, action) {
	let ns = apiDataReducer(state, action)
	switch(action.type) {
		case START_ADDING_FORMULA:
			return startAddingFormula(ns, action)
		default:
			return ns
	}
}

function startAddingFormula(state, action) {
	return update(state, {
		ui: {
			isAddingFormula: {
				$set: action.process_type
			}
		}
	})
}
