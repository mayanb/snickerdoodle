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
  REQUEST_EDIT_ITEM, 
  REQUEST_EDIT_ITEM_SUCCESS,
  REQUEST_EDIT_ITEM_FAILURE,
  PAGE,
  SELECT,
} from './APIDataReducer'
import api from '../components/WaffleconeAPI/api.jsx'

export function fetch(name, request, sort, processorFn) {
  return dispatch => {
    dispatch(getRequest(name))
    return api.get(request.url)
      .query(request.query)
      .then(async (res) => {
        let processed = await processorFn(res)
        return dispatch(requestSuccess(name, processed, sort))
      })
      .catch(err => dispatch(requestFailure(name, err)))
  }
}

export function postCreate(name, request, sort, processorFn) {
  return dispatch => {
    dispatch(requestCreate(name))
    return api.post(request.url)
      .send(request.data)
      .then(async (res) => {
        let processed = await processorFn(res)
        return dispatch(requestCreateSuccess(name, processed, sort))
      })
      .catch(err => dispatch(requestCreateFailure(name, err)))
  }
}

export function postEdit(name, request, index, processorFn) {
  return dispatch => {
    dispatch(requestEdit(name, index))
    return api.patch(request.url)
      .send(request.data)
      .then(async (res) => {
        let processed = await processorFn(res)
        return dispatch(requestEditSuccess(name, processed, index))
      })
      .catch((err) => {
        dispatch(requestEditFailure(name, err, index))
        throw err
      })
  }
}

export function postDelete(name, request, index) {
  return dispatch => {
    dispatch(requestDelete(name, index))
    return api.patch(request.url)
      .send(request.data)
      .then(() => dispatch(requestDeleteSuccess(name, index)))
      .catch(err => {
        dispatch(requestDeleteFailure(name, index, err))
        throw err
      })
  }
}

export function page(name, direction) {
  return {
    type: PAGE,
    direction: direction,
    name: name,

  }
}

export function select(name, id) {
  return {
    type: SELECT,
    index: id,
    name: name,
  }
}



/*********************
 *                   *
 *     HELPER FNs    *
 *                   *
 *********************/

export function getRequest(name) {
  return {
    name: name,
    type: REQUEST
  }
}

export function requestFailure(name, err) {
  console.log('Oh no! Something went wrong\n' + err)
  return {
    name: name,
    type: REQUEST_FAILURE, 
    error: err
  }
}

export function requestSuccess(name, json, sort) {
  return {
    name: name,
    sort: sort,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function requestCreate(name) {
  return {
    type: REQUEST_CREATE, 
    name: name
  }
}

export function requestCreateFailure(name, err) {
  console.log('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: name,
    error: err,
  }
}

export function requestCreateSuccess(name, json, sort) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: sort,
    name: name,
  }
}

export function requestDelete(name, index) {
  return {
    type: REQUEST_DELETE,
    name: name
  }
}

export function requestDeleteFailure(name, index, err) {
  return {
    type: REQUEST_DELETE_FAILURE,
    index: index,
    name: name,
    error: err
  }
}

export function requestDeleteSuccess(name, index) {
  return {
    type: REQUEST_DELETE_SUCCESS,
    name: name,
    index: index,
  }
}

// Edit helpers
function requestEdit(name, index) {
  return {
    type: REQUEST_EDIT_ITEM,
    name: name,
    index: index
  }
}

function requestEditSuccess(name, json, index) {
  return {
    type: REQUEST_EDIT_ITEM_SUCCESS,
    name: name,
    index: index,
    updatedObject: json,
  }
}

function requestEditFailure(name, err, index) {
  console.log(err)
  return {
    type: REQUEST_EDIT_ITEM_FAILURE,
    name: name,
    err: err,
    index: index, 
  }
}
