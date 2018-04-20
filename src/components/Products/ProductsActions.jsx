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
  PAGE,
} from '../../reducers/APIDataReducer'
import { PRODUCTS } from '../../reducers/ReducerTypes'
import {alphabetize} from '../../utilities/arrayutils.jsx'


export function fetchProducts(q) {
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestProducts())

    // actually fetch 
    return api.get('/ics/products/')
      .query(q)
      .then(res => dispatch(requestProductsSuccess(res.body.sort(alphabetize))))
      .catch(err => dispatch(requestProductsFailure(err)))
  }
}

function requestProducts() {
  return {
    name: PRODUCTS,
    type: REQUEST
  }
}

function requestProductsFailure(err) {
  console.error('Oh no! Something went wrong\n' + err)
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

export function pageProducts(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: PRODUCTS,

  }
}

export function postCreateProduct(json) {
  return function (dispatch) {
    dispatch(requestCreateProduct())

    return api.post('/ics/products/')
      .send(json)
      .then((res) => {
	      return dispatch(requestCreateProductSuccess(res.body))
      })
      .catch((err) => dispatch(requestCreateProductFailure(err)))
  }
}


function requestCreateProduct() {
  return {
    type: REQUEST_CREATE, 
    name: PRODUCTS
  }
}

function requestCreateProductFailure(err) {
  console.error('Oh no! Something went wrong!\n' + JSON.stringify(err))
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

/**
function formatProductResponse(json) {
  let products = {}
  
  if (!json)
    return {}

  for (var p of json) {
    products[p.id] = p
  }
  return products
}
 */

export function postDeleteProduct(p, index, callback) {
  return function (dispatch) {
    dispatch(requestDeleteProduct(index))

    return api.put(`/ics/products/${p.id}/`)
      .send({ 
          name: p.name,
          code: p.code,
          created_by: p.created_by,
          team_created_by: p.team_created_by,
          is_trashed: true,
        })
	    .then(() => dispatch(requestDeleteProductSuccess(index)))
	    .catch(err => dispatch(requestDeleteProductFailure(index, err)))
  }
}


function requestDeleteProduct(index) {
  return {
    type: REQUEST_DELETE,
    // index: index,
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
    index: index,
  }
}
