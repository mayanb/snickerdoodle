import api from '../WaffleconeAPI/api.jsx'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS'
export const REQUEST_PRODUCTS_FAILURE = 'REQUEST_PRODUCTS_FAILURE'

export const SELECT_PRODUCT = 'SELECT_PRODUCT'

export const FETCH_PRODUCT_INVENTORY = 'FETCH_PRODUCT_INVENTORY'
export const REQUEST_PRODUCT_INVENTORY = 'REQUEST_PRODUCT_INVENTORY'
export const REQUEST_PRODUCT_INVENTORY_SUCCESS = 'REQUEST_PRODUCT_INVENTORY_SUCCESS'
export const REQUEST_PRODUCT_INVENTORY_FAILURE = 'REQUEST_PRODUCT_INVENTORY_FAILURE'

export const PAGE_PRODUCTS = 'PAGE_PRODUCTS' 

export function fetchProducts() {
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestProducts())

    // actually fetch 
    return api.mockget('/ics/products/')
      .then( function (err, res) {
        res = err
        err = null
        if (err || !res.ok) {
          dispatch(requestProductsFailure(err))
        } else {
          let products = formatProductResponse(res.body)
          dispatch(requestProductsSuccess(products))
        }
      })
  }
}

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  }
}

function requestProductsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_PRODUCTS_FAILURE
  }
}

function requestProductsSuccess(json) {
  return {
    type: REQUEST_PRODUCTS_SUCCESS,
    data: json, 
  }
}

export function fetchProductInventory(product) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestProductInventory())

    return api.mockget('/ics/inventory')
      //.query({products: product.code})
      .then(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestProductInventoryFailure(err))
        } else {
          dispatch(requestProductInventorySuccess(res.body, product.id))
        }
      })
  }
}

function requestProductInventory() {
  return {
    type: REQUEST_PRODUCT_INVENTORY
  }
}

function requestProductInventoryFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_PRODUCT_INVENTORY_FAILURE
  }
}

function requestProductInventorySuccess(json, id) {
  return {
    type: REQUEST_PRODUCT_INVENTORY_SUCCESS,
    data: json,
    id: id
  }
}


export function selectProduct(id) {
  return {
    type: SELECT_PRODUCT,
    id: id
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

export function pageProducts(direction) {
  return {
    type: PAGE_PRODUCTS,
    direction: direction
  }
}


