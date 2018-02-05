import update from 'immutability-helper'
import {apiDataReducer} from './APIDataReducer'

export const START_ADDING_FORMULA = 'START_ADDING_FORMULA'
export const ADD_SECTION = 'ADD_SECTION'


export function _formula(state, action) {
	let ns = apiDataReducer(state, action)
	switch(action.type) {
		case START_ADDING_FORMULA:
			return startAddingFormula(ns, action)
		case ADD_SECTION:
			return addSection(ns, action)
		default:
			return ns
	}
}

function startAddingFormula(state, action) {
	// are we clearing the formula for a brand new section with nothing in them



	if (!action.process_type && state.ui.isAddingSection) {
		console.log('should remove section')
		return update(state, {
			ui: {
				$merge: {
					isAddingSection: false,
					isAddingFormula: false,
				}
			}
		})
	}
	return update(state, {
		ui: {
			isAddingFormula: {
				$set: action.process_type
			}
		}
	})
}

/**
function countFormulasForActiveProcess(state) {
	let active_process = state.ui.isAddingFormula
	var count = 0;
	for(var i = 0; i < state.data.length; ++i){
		let process_id = (state.data[i].attribute_obj || state.data[i].attribute).process_type
	  if(process_id === active_process) {
	    count++;
	  }
	}
	return count
}
 */

function addSection(state, action) {
	return update(state, {
		ui: {
			$merge: {
				isAddingSection: action.process_type,
				isAddingFormula: action.process_type.id
			}
		}
	})
}
