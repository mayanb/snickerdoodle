import update from 'immutability-helper'
import {findPosition, alphabetize} from './arrayutils'

import {
  REQUEST_PRODUCTS, 
  REQUEST_PRODUCTS_SUCCESS, 
  SELECT_PRODUCT,
  REQUEST_PRODUCT_INVENTORY,
  REQUEST_PRODUCT_INVENTORY_SUCCESS,
  REQUEST_CREATE_PRODUCT,
  REQUEST_CREATE_PRODUCT_SUCCESS,
  REQUEST_DELETE_PRODUCT_SUCCESS,
  PAGE_PRODUCTS
} from './ProductsActions.jsx'

var initialProductState = {
  items: {},
  inventories: {},
  ui: {
    page_size: 15,
    selectedItem: 4,
    currentPage: 0,
    isFetchingList: false,
    isFetchingInventory: false,
    isCreatingItem: false,
    sortedArray: []
  }
}


export default function _products(state = initialProductState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return requestProducts(state, action)
    case REQUEST_PRODUCTS_SUCCESS:
      return requestProductsSuccess(state, action)
    case SELECT_PRODUCT:
      return selectProduct(state, action)
    case REQUEST_PRODUCT_INVENTORY:
      return requestProductInventory(state, action)
    case REQUEST_PRODUCT_INVENTORY_SUCCESS: 
      return requestProductInventorySuccess(state, action)
    case PAGE_PRODUCTS:
      return page(state, action)
    case REQUEST_CREATE_PRODUCT:
      return requestCreateProduct(state, action)
    case REQUEST_CREATE_PRODUCT_SUCCESS:
      return requestCreateProductSuccess(state, action)
    case REQUEST_DELETE_PRODUCT_SUCCESS:
      return requestDeleteProductSuccess(state, action)
    default:
      return state
  }
}

function requestProducts(state, action) {
  return update(state, {
    ui: {
      isFetchingList: {
        $set: true
      }
    }
  })
}

function requestProductsSuccess(state, action) {
  return update(state, {
    ui: {
      $merge: {
        isFetchingList: false,
        page: 0,
        sortedArray: action.data.sort(alphabetize)
      }
    },
    items: {
      $set: formatProductResponse(action.data)
    }
  })
}

function selectProduct(state, action) {

  // get the page number:
  let index = state.ui.sortedArray.findIndex((e, i, a) => e.id == action.id)
  let pageNumber = Math.trunc(index / state.ui.page_size)

  return update(state, {
    ui: {
      $merge: {
        selectedItem: action.id,
        currentPage: pageNumber
      }
    }
  })


}

function requestProductInventory(state, action) {
  return update(state, {
    ui: {
      isFetchingInventory: {
        $set: true
      }
    }
  })
}

function requestProductInventorySuccess(state, action) {
  return update(state, {
    ui: {
      isFetchingInventory: {
        $set: false
      }
    }, 
    inventories: {
      [action.id]: {
        $set: action.data
      }
    }
  })
}

function page(state, action) {
  return update(state, {
    ui: {
      currentPage: {
        $set: state.ui.currentPage + action.direction
      }
    }
  })
}

function requestCreateProduct(state, action) {
  return update(state, {
    ui: {
      isCreatingItem: {
        $set: true
      }
    }
  })
}

function requestCreateProductSuccess(state, action) {
  let pos = findPosition(state.ui.sortedArray, action.item, alphabetize)
  return update(state, {
    ui: {
      isCreatingItem: {
        $set: false
      },
      sortedArray: {
        $splice: [[pos, 0, action.item]]
      }
    },
    items: {
      $merge: {
        [action.item.id]: action.item
      }
    },
  })
}

function requestDeleteProduct(state, action) {
  return state
}

function requestDeleteProductSuccess(state, action) {
  let pos = findPosition(state.ui.sortedArray, action.item, alphabetize)
  return update(state, {
    items: {
      $unset: [action.id]
    }, 
    ui: {
      sortedArray: {
        $splice: [[pos, 1]]
      }
    }
  })
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


