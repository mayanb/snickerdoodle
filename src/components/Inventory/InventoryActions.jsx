import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../APIDataReducer'
import { INVENTORIES } from '../../ReducerTypes'


export function fetchInventory(filter) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestProductInventory())

    return api.get('/ics/inventory')
      .query(filter)
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestProductInventoryFailure(err))
        } else {
          dispatch(requestProductInventorySuccess(res.body))
        }
      })
  }
}

function requestProductInventory() {
  return {
    name: INVENTORIES,
    type: REQUEST
  }
}

function requestProductInventoryFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  console.log(err)
  return {
    type: REQUEST_FAILURE,
    name: INVENTORIES,
  }
}

function requestProductInventorySuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    data: json,
    name: INVENTORIES,
  }
}