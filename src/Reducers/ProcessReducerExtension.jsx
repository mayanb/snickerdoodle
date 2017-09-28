import { apiDataReducer } from './APIDataReducer'
import { _processAttribute } from './ProcessAttributeReducer'

export function _process(state, action) {
	let ns = apiDataReducer(state, action)
  return _processAttribute(ns, action)
}