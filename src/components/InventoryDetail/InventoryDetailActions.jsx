import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../Reducers/APIDataReducer'
import { TOGGLE_TASK_SELECTALL, TOGGLE_ITEM_SELECT, REQUEST_MORE, REQUEST_MORE_SUCCESS, REQUEST_MORE_FAILURE } from './InventoryDetailsReducer'
import { INVENTORYDETAILS } from '../../Reducers/ReducerTypes'


export function fetchInventory(filter) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestInventory())
    return api.get('/ics/inventory/detail-test/')
      .query(filter)
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestInventoryFailure(err))
        } else {
          dispatch(requestInventorySuccess(res.body))
        }
      })
  }
}

function requestInventory() {
  return {
    name: INVENTORYDETAILS,
    type: REQUEST
  }
}

function requestInventoryFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  console.log(err)
  return {
    type: REQUEST_FAILURE,
    name: INVENTORYDETAILS,
  }
}

function requestInventorySuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    data: json,
    name: INVENTORYDETAILS,
  }
}

export function toggleItemSelect(taskIndex, itemIndex) {
  return {
    type: TOGGLE_ITEM_SELECT,
    taskIndex: taskIndex,
    itemIndex: itemIndex,
    name: INVENTORYDETAILS
  }
}

export function toggleTaskSelectAll(taskIndex) {
  return {
    type: TOGGLE_TASK_SELECTALL,
    taskIndex: taskIndex,
    name: INVENTORYDETAILS
  }
}

export function fetchMore(next) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestMore())
    return api.get('/ics/inventory/detail-test/')
      .query(next)
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestMoreFailure(err))
        } else {
          dispatch(requestMoreSuccess(res.body))
        }
      })
  }
}

export function requestMore() {
  return {
    type: REQUEST_MORE,
    name: INVENTORYDETAILS
  }
}

export function requestMoreSuccess(data) {
  return {
    type: REQUEST_MORE_SUCCESS,
    name: INVENTORYDETAILS,
    data: data
  }
}

export function requestMoreFailure() {
  return {
    type: REQUEST_MORE_FAILURE,
    name: INVENTORYDETAILS
  }
}

export function postDeliverItems(itemsToDeliver, destination) {
  // let users = JSON.parse(window.localStorage.getItem('users-v4.1'))
  // let user = users.data[users.ui.activeUser].user
  // let team = user.team
  // let component = this
  // let url = '/ics/v4/movements/create/'

  // let params = {
  //   status: "RC", 
  //   origin: user.user_id,
  //   destination: null,
  //   team_origin: user.team, 
  //   team_destination: destination,  
  //   notes: "DELIVERED VIA WEB",
  //   items: itemsToDeliver
  // }

  // let headers = {
  //   contentType: 'application/json',
  //   processData: false,
  // }

  // post(api.host + url, JSON.stringify(params), headers)
  //   .done(function (data) {
  //     if (callback) 
  //       callback()
  //     component.props.onDelivery(component.state.selectedCount)
  //     component.setState({selectedCount: 0})
  //   }).fail(function (req, err) {
  //     alert(`Couldn't deliver the items. :( \n ${err}`)
  //   })
}