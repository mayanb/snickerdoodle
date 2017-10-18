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
  REQUEST_EDIT_ITEM,
  REQUEST_EDIT_ITEM_SUCCESS,
  REQUEST_EDIT_ITEM_FAILURE,
  SELECT,
  PAGE,
} from '../../Reducers/APIDataReducer'
import { PRODUCTS, INVENTORIES } from '../../Reducers/ReducerTypes'
import {findPosition, alphabetize} from '../Logic/arrayutils.jsx'


export function fetchProducts() {
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestProducts())

    // actually fetch 
    return api.get('/ics/products/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestProductsFailure(err))
        } else {
          //let products = formatProductResponse(res.body)
          dispatch(requestProductsSuccess(res.body.sort(alphabetize)))
          dispatch(selectProduct(0))

        }
      })
  }
}

function requestProducts() {
  return {
    name: PRODUCTS,
    type: REQUEST
  }
}

function requestProductsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: PRODUCTS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestProductsSuccess(json) {
  return {
    name: PRODUCTS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


export function selectProduct(index) {
  return {
    type: SELECT,
    index: index,
    name: PRODUCTS,

  }
}


export function pageProducts(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: PRODUCTS,

  }
}

export function postCreateProduct(json, success) {
  return function (dispatch) {
    dispatch(requestCreateProduct())

    return api.post('/ics/products/')
      .send(json)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreateProductFailure(err))
        else
          dispatch(requestCreateProductSuccess(res.body))
          success(res.body.id)
      })
  }
}


function requestCreateProduct() {
  return {
    type: REQUEST_CREATE, 
    name: PRODUCTS
  }
}

function requestCreateProductFailure(err) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: PRODUCTS,
    error: err,
  }
}

function requestCreateProductSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: alphabetize,
    name: PRODUCTS,
  }
}

function formatProductResponse(json) {
  let products = {}
  
  if (!json)
    return {}

  for (var p of json) {
    products[p.id] = p
  }
  return products
}

export function postDeleteProduct(p, index, callback) {
  return function (dispatch) {
    dispatch(requestDeleteProduct(index))
    console.log(p.name)
    console.log(p.created_by)
    console.log(p.team_created_by)

    return api.put(`/ics/products/${p.id}/`)
      .send({ 
          name: p.name,
          code: p.code,
          created_by: p.created_by,
          team_created_by: p.team_created_by,
          is_trashed: true,
        })
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestDeleteProductFailure(index, err))
        else {
          dispatch(requestDeleteProductSuccess("is_trashed", true, index))
          callback()
        }
      })
  }
}


function requestDeleteProduct(index) {
  return {
    type: REQUEST_EDIT_ITEM,
    // index: index,
    name: PRODUCTS
  }
}

function requestDeleteProductFailure(index, err) {
  return {
    type: REQUEST_EDIT_ITEM_FAILURE,
    index: index,
    name: PRODUCTS,
    error: err
  }
}

function requestDeleteProductSuccess(field, value, index) {
  return {
    type: REQUEST_EDIT_ITEM_SUCCESS,
    name: PRODUCTS,
    index: index,
    field: field,
    value: value
  }
}
