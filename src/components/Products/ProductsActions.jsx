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

export const POST_CREATE_PRODUCT = 'POST_CREATE_PRODUCT'
export const REQUEST_CREATE_PRODUCT = 'REQUEST_CREATE_PRODUCT'
export const REQUEST_CREATE_PRODUCT_FAILURE = 'REQUEST_CREATE_PRODUCT_FAILURE'
export const REQUEST_CREATE_PRODUCT_SUCCESS = 'REQUEST_CREATE_PRODUCT_SUCCESS'

export const POST_DELETE_PRODUCT = 'POST_DELETE_PRODUCT'
export const REQUEST_DELETE_PRODUCT = 'REQUEST_DELETE_PRODUCT'
export const REQUEST_DELETE_PRODUCT_FAILURE = 'REQUEST_DELETE_PRODUCT_FAILURE'
export const REQUEST_DELETE_PRODUCT_SUCCESS = 'REQUEST_DELETE_PRODUCT_SUCCESS'

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
          dispatch(requestProductsSuccess(res.body))
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
  console.log(err)
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

    return api.get('/ics/inventory')
      .query({products: product.code})
      .end(function (err, res) {
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
  console.log(err)
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


export function pageProducts(direction) {
  return {
    type: PAGE_PRODUCTS,
    direction: direction
  }
}

export function postCreateProduct(json) {
  return function (dispatch) {
    dispatch(requestCreateProduct())

    return api.post('/ics/products/')
      .send(json)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestCreateProductFailure(err))
        else
          dispatch(requestCreateProductSuccess(res.body))
          dispatch(selectProduct(res.body.id))
      })
  }
}

function requestCreateProduct() {
  return {
    type: REQUEST_CREATE_PRODUCT
  }
}

function requestCreateProductFailure(err) {
  alert('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_PRODUCT_FAILURE
  }
}

function requestCreateProductSuccess(json) {
  return {
    type: REQUEST_CREATE_PRODUCT_SUCCESS,
    item: json
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

export function postDeleteProduct(id, callback) {
  return function (dispatch) {
    dispatch(requestDeleteProduct(id))

    return api.del('/ics/products/', id)
      .end(function (err, res) {
        if (err || !res.ok)
          dispatch(requestDeleteProductFailure(id))
        else {
          dispatch(requestDeleteProductSuccess(id))
          callback()
        }
      })
  }
}

function requestDeleteProduct(id) {
  return {
    type: REQUEST_DELETE_PRODUCT,
    id: id
  }
}

function requestDeleteProductFailure(id) {
  return {
    type: REQUEST_DELETE_PRODUCT_FAILURE,
    id: id
  }
}

function requestDeleteProductSuccess(id) {
  return {
    type: REQUEST_DELETE_PRODUCT_SUCCESS,
    id: id
  }
}


