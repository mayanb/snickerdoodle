import update from 'immutability-helper'

import {
  REQUEST_PROCESSES, 
  REQUEST_PROCESSES_SUCCESS, 
  SELECT_PROCESS,
  REQUEST_PROCESS_INVENTORY,
  REQUEST_PROCESS_INVENTORY_SUCCESS,
  PAGE_PROCESSES
} from './ProcessesActions.jsx'

var initialProcessState = {
  items: {},
  inventories: {},
  ui: {
    isFetchingList: false,
    selectedItem: 4,
    isFetchingInventory: false,
    currentPage: 0
  }
}


export default function _processes(state = initialProcessState, action) {
  switch (action.type) {
    case REQUEST_PROCESSES:
      return requestProcesses(state, action)
    case REQUEST_PROCESSES_SUCCESS:
      return requestProcessesSuccess(state, action)
    case SELECT_PROCESS:
      return selectProcess(state, action)
    case REQUEST_PROCESS_INVENTORY:
      return requestProcessInventory(state, action)
    case REQUEST_PROCESS_INVENTORY_SUCCESS: 
      return requestProcessInventorySuccess(state, action)
    case PAGE_PROCESSES:
      return page(state, action)
    default:
      return state
  }
}

function requestProcesses(state, action) {
  return update(state, {
    ui: {
      isFetchingList: {
        $set: true
      }
    }
  })
}

function requestProcessesSuccess(state, action) {
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

function selectProcess(state, action) {
  return update(state, {
    ui: {
      selectedItem: {
        $set: action.id
      }
    }
  })
}

function requestProcessInventory(state, action) {
  return update(state, {
    ui: {
      isFetchingInventory: {
        $set: true
      }
    }
  })
}

function requestProcessInventorySuccess(state, action) {
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


