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
  PRODUCTS,
  INVENTORIES
} from '../../create-store.jsx'
import {findPosition, alphabetize} from '../Logic/arrayutils.jsx'


// export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
// export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
// export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS'
// export const REQUEST_PRODUCTS_FAILURE = 'REQUEST_PRODUCTS_FAILURE'

// export const SELECT_PRODUCT = 'SELECT_PRODUCT'

// export const FETCH_PRODUCT_INVENTORY = 'FETCH_PRODUCT_INVENTORY'
// export const REQUEST_PRODUCT_INVENTORY = 'REQUEST_PRODUCT_INVENTORY'
// export const REQUEST_PRODUCT_INVENTORY_SUCCESS = 'REQUEST_PRODUCT_INVENTORY_SUCCESS'
// export const REQUEST_PRODUCT_INVENTORY_FAILURE = 'REQUEST_PRODUCT_INVENTORY_FAILURE'

// export const PAGE_PRODUCTS = 'PAGE_PRODUCTS' 

// export const POST_CREATE_PRODUCT = 'POST_CREATE_PRODUCT'
// export const REQUEST_CREATE_PRODUCT = 'REQUEST_CREATE_PRODUCT'
// export const REQUEST_CREATE_PRODUCT_FAILURE = 'REQUEST_CREATE_PRODUCT_FAILURE'
// export const REQUEST_CREATE_PRODUCT_SUCCESS = 'REQUEST_CREATE_PRODUCT_SUCCESS'

// export const POST_DELETE_PRODUCT = 'POST_DELETE_PRODUCT'
// export const REQUEST_DELETE_PRODUCT = 'REQUEST_DELETE_PRODUCT'
// export const REQUEST_DELETE_PRODUCT_FAILURE = 'REQUEST_DELETE_PRODUCT_FAILURE'
// export const REQUEST_DELETE_PRODUCT_SUCCESS = 'REQUEST_DELETE_PRODUCT_SUCCESS'

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

export function fetchProductInventory(product) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestProductInventory())

    return api.get('/ics/inventory')
      .query({products: product.code})
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

export function postDeleteProduct(index, callback) {
  return function (dispatch) {
    dispatch(requestDeleteProduct(index))

    return api.del('/ics/products/', index)
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
    index: index
  }
}


