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

    return api.del('/ics/products/', p.id)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestDeleteProductFailure(index, err))
        else {
          dispatch(requestDeleteProductSuccess(index))
          callback()
        }
      })
  }
}

function requestDeleteProduct(index) {
  return {
    type: REQUEST_DELETE,
    index: index,
    name: PRODUCTS
  }
}

function requestDeleteProductFailure(index, err) {
  return {
    type: REQUEST_DELETE_FAILURE,
    index: index,
    name: PRODUCTS,
    error: err
  }
}

function requestDeleteProductSuccess(index) {
  return {
    type: REQUEST_DELETE_SUCCESS,
    name: PRODUCTS,
    index: index
  }
}


