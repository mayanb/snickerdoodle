import * as actions from '../../reducers/APIDataActions'
import { MEMBERS } from '../../reducers/ReducerTypes'
import { sortByAccountType } from '../../utilities/arrayutils'

export function fetchTeamMembers(q) {
  let request = { 
    url: '/ics/userprofiles/', 
    query: {},
  }
  return actions.fetch(MEMBERS, request, sortByAccountType, res => res.body)
}

export function postCreateMember(json) {
  let request = {
    url: '/ics/users/create/',
    data: {...json, username: json.username.toLowerCase() }
  }
  return actions.postCreate(MEMBERS, request, null, res => res.body)
}

export function postRequestEditAccountType(index, data, success) {
  let newData = { account_type: data.new_account_type }
  let request = {
    url: `/ics/userprofiles/edit/${data.id}/`,
    data: newData
  }
  return actions.patchEdit(MEMBERS, request, index, () => newData)
}

export function pageMembers(direction) {
  return actions.page(MEMBERS, direction)
}

export function selectMember(index) {
  return actions.select(MEMBERS, index)
}
