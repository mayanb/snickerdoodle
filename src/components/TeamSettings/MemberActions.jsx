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
  SELECT,
  PAGE,
} from '../../Reducers/APIDataReducer'
import { MEMBERS } from '../../Reducers/ReducerTypes'


export function fetchTeamMembers() {
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestMembers())

    // actually fetch 
    return api.get('/ics/userprofiles/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestMembersFailure(err))
        } else {
          //let members = formatMemberResponse(res.body)
          dispatch(requestMembersSuccess(res.body))
        }
      })
  }
}

function requestMembers() {
  return {
    name: MEMBERS,
    type: REQUEST
  }
}

function requestMembersFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: MEMBERS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestMembersSuccess(json) {
  return {
    name: MEMBERS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function selectMember(index) {
  return {
    type: SELECT,
    index: index,
    name: MEMBERS,

  }
}


export function pageMembers(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: MEMBERS,

  }
}

export function postCreateMember(json, success) {
  return function (dispatch) {
    dispatch(requestCreateMember())

    return api.post('/ics/users/create/')
      .send(json)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreateMemberFailure(err))
        else
          dispatch(requestCreateMemberSuccess(res.body))
          success(res.body.id)
      })
  }
}


function requestCreateMember() {
  return {
    type: REQUEST_CREATE, 
    name: MEMBERS
  }
}

function requestCreateMemberFailure(err) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: MEMBERS,
    error: err,
  }
}

function requestCreateMemberSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    name: MEMBERS,
  }
}

