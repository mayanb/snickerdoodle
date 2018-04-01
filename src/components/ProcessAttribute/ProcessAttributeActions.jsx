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
  REQUEST_MOVE_ATTRIBUTE_SUCCESS,
  REQUEST_MOVE_ATTRIBUTE_FAILURE,
  REQUEST_UPDATE_ATTRIBUTE_SUCCESS,
  SELECT_ATTRIBUTE,
  REQUEST_ATTRIBUTE_DETAILS,
  REQUEST_ATTRIBUTE_DETAILS_SUCCESS,
} from '../../reducers/ProcessAttributeReducer'
import {  PROCESSES } from '../../reducers/ReducerTypes'

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
      .then((res) => dispatch(requestSaveAttributeSuccess(index, res.body)))
      .catch((err) => {
        dispatch(requestSaveAttributeFailure(index))
      })
      .finally(() => dispatch(finishAddingAttribute()))
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

export function postRequestMoveAttribute(process_index, id, new_rank) {
  return function (dispatch) {
    //dispatch(requestMoveAttribute())

    return api.put(`/ics/attributes/move/${id}/`)
      .send({new_rank: new_rank})
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestMoveAttributeFailure(process_index))
        } else {
          dispatch(requestMoveAttributeSuccess(process_index, id, new_rank))
        }
      })
  }
}

function requestMoveAttributeSuccess(process_index, id, new_rank) {
  return {
    type: REQUEST_MOVE_ATTRIBUTE_SUCCESS,
    name: PROCESSES, 
    process_index: process_index,
    id: id,
    new_rank: new_rank
  }
}

function requestMoveAttributeFailure(process_index) {
  return {
    type: REQUEST_MOVE_ATTRIBUTE_FAILURE,
    name: PROCESSES,
    process_index: process_index,
  }
}

export function selectAttribute(process_index, id) {
  return {
    type: SELECT_ATTRIBUTE,
    name: PROCESSES,
    process_index: process_index,
    id: id,
  }
}

export function postUpdateAttribute(p, id, updated) {
  return function (dispatch) {
    dispatch(requestUpdateAttributeSuccess(p, id, updated))

    return api.put(`/ics/attributes/${id}/`)
      .send(updated)
      .then(res => console.log(res))
      .catch(e => alert('ugh'))
  }

  function requestUpdateAttributeSuccess(p, id, updated) {
    return {
      type: REQUEST_UPDATE_ATTRIBUTE_SUCCESS,
      name: PROCESSES,
      process: p,
      id: id,
      attribute_updates: updated,
    }
  }
}

export function fetchAttributeDetails(p, id) {
  return dispatch => {
    dispatch(requestAttributeDetails())
    return api.get(`/ics/attributes/${id}`)
      .then(res => dispatch(requestAttributeDetailsSuccess(p, id, res.body)))
      .catch(e => console.log(e))
  }
}

function requestAttributeDetails() {
  return {
    type: REQUEST_ATTRIBUTE_DETAILS,
    name: PROCESSES,
  }
}

function requestAttributeDetailsSuccess(p, id, details) {
  return {
    type: REQUEST_ATTRIBUTE_DETAILS_SUCCESS,
    name: PROCESSES,
    process: p,
    id: id, 
    details: details
  }
}
