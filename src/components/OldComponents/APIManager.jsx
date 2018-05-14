import $ from 'jquery'
import update from 'immutability-helper'
import Teams from '../Teams/Teams'

var refreshing = false

function fetch(url, params) {
  let team = Teams.all().auth_active
  params.team = team
  console.log(params)
  return $.get(url, params)
}

function post(url, params, headers) {

  while (refreshing) {
    
  }

  let req = {
    method: "POST",
    url: url,
    data: params,
  }

  if (headers) {
    req = update(req, {$merge: headers})
  }

  return $.ajax(req)
}

function put(url, params) {
  return $.ajax({
    method: "PUT",
    url: url,
    data: params, 
  })
}

function del(url) {
  return $.ajax({
    method: "DELETE",
    url: url
  })
}


export { fetch, post, put, del }