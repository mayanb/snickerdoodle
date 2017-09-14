import update from 'immutability-helper'

import {
  REQUEST_PRODUCTS, 
  REQUEST_PRODUCTS_SUCCESS, 
  SELECT_PRODUCT,
  REQUEST_PRODUCT_INVENTORY,
  REQUEST_PRODUCT_INVENTORY_SUCCESS,
  PAGE_PRODUCTS
} from './ProductsActions.jsx'

var initialProductState = {
  items: {},
  inventories: {},
  ui: {
    isFetchingList: false,
    selectedItem: 4,
    isFetchingInventory: false,
    currentPage: 0
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
        page: 0
      }
    },
    items: {
      $set: action.data
    }
  })
}

function selectProduct(state, action) {
  return update(state, {
    ui: {
      selectedItem: {
        $set: action.id
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






// shape of product state:
// state = {
//   items: {
//     [id1] : { ...productJSON },
//     [id2] : { ...productJSON },
//     ...
//   },
//   ui: {
//     selected: [id],
//     isFetching: [BOOL],
//   }
// }


