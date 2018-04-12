import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  REQUEST_EDIT_ITEM,
  REQUEST_EDIT_ITEM_SUCCESS,
  SELECT,
  PAGE,
} from '../../reducers/APIDataReducer'
import { MEMBERS } from '../../reducers/ReducerTypes'
import { sortByAccountType } from '../../utilities/arrayutils'


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
          dispatch(requestMembersSuccess(res.body.sort(sortByAccountType)))
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
    data: json, 
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
    let data = {...json, username: json.username.toLowerCase() }
    return api.post('/ics/users/create/')
      .send(data)
      .then((res) => {
        dispatch(requestCreateMemberSuccess(res.body))
        success()
      })
      .catch((err) => dispatch(requestCreateMemberFailure(err)))
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

export function postRequestEditAccountType(index, data, success) {
  return function (dispatch) {
    dispatch(requestEditMember())

    return api.put(`/ics/userprofiles/edit/${data.id}/`)
      .send({account_type: data.new_account_type})
      .end(function (err, res) {
        if (err || !res.ok) 
          alert('ugh')
        else {
          dispatch(requestEditMemberSuccess(index, 'account_type', data.new_account_type))
          success()
        }
      })
  }
}

function requestEditMember() {
  return {
    type: REQUEST_EDIT_ITEM,
    name: MEMBERS,
  }
}

function requestEditMemberSuccess(index, field, value) {
  return {
    type: REQUEST_EDIT_ITEM_SUCCESS,
    name: MEMBERS,
    index: index,
    updatedObject: {[field] : value},
  }
}
