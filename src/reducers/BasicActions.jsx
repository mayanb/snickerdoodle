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
  PAGE,
} from './APIDataReducer'

export function request(name) {
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

export function page(name, direction) {
  return {
    type: PAGE,
    direction: direction,
    name: name,

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
