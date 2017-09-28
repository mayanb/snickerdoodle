import api from '../WaffleconeAPI/api.jsx'
import {
  START_ADDING_ATTRIBUTE,
  FINISH_ADDING_ATTRIBUTE,
  REQUEST_SAVE_ATTRIBUTE,
  REQUEST_SAVE_ATTRIBUTE_SUCCESS,
  REQUEST_SAVE_ATTRIBUTE_FAILURE,
  REQUEST_ARCHIVE_ATTRIBUTE,
  REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS,
  REQUEST_ARCHIVE_ATTRIBUTE_FAILURE,
} from '../../Reducers/ProcessAttributeReducer'
import {  PROCESSES, PROCESS_INVENTORY } from '../../Reducers/ReducerTypes'
import {findPosition, alphabetize} from '../Logic/arrayutils.jsx'

export function startAddingAttribute() {
  return {
    type: START_ADDING_ATTRIBUTE, 
    name: PROCESSES,
  }
}

export function finishAddingAttribute() {
  return {
    type: FINISH_ADDING_ATTRIBUTE, 
    name: PROCESSES,
  }
}

export function saveAttribute(index, attribute) {
  return function (dispatch) {

    dispatch(requestSaveAttribute())

    return api.post('/ics/attributes/')
      .send(attribute)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestSaveAttributeFailure(index))
        } else {
          dispatch(requestSaveAttributeSuccess(index, res.body))
          dispatch(finishAddingAttribute())
        }
      })
  }
}

export function requestSaveAttribute() {
  return {
    type: REQUEST_SAVE_ATTRIBUTE, 
    name: PROCESSES,
  }
}

export function requestSaveAttributeSuccess(p, attribute) {
  return {
    type: REQUEST_SAVE_ATTRIBUTE_SUCCESS, 
    process: p,
    attribute: attribute,
    name: PROCESSES,
  }
}

export function requestSaveAttributeFailure(p) {
  return {
    type: REQUEST_SAVE_ATTRIBUTE_FAILURE,
    name: PROCESSES,
    process: p
  }
}

export function archiveAttribute(process_index, attribute_index, attribute) {
  return function (dispatch) {
    dispatch(requestArchiveAttribute(process_index, attribute_index))

    return api.put(`/ics/attributes/${attribute.id}/`)
      .send({is_trashed: true})
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestArchiveAttributeFailure(process_index, attribute_index, attribute))
        } else {
          dispatch(requestArchiveAttributeSuccess())
        }
      })
  }
}

function requestArchiveAttribute(process_index, attribute_index) {
  return {
    type: REQUEST_ARCHIVE_ATTRIBUTE,
    name: PROCESSES,
    process_index: process_index,
    attribute_index: attribute_index
  }
}

function requestArchiveAttributeSuccess() {
  return {
    type: REQUEST_ARCHIVE_ATTRIBUTE_SUCCESS,
    name: PROCESSES
  }
}

function requestArchiveAttributeFailure(process_index, attribute_index, old_attribute) {
  return {
    type: REQUEST_ARCHIVE_ATTRIBUTE_FAILURE,
    name: PROCESSES,
    process_index: process_index,
    attribute_index: attribute_index,
    old_attribute: old_attribute
  }
}

