import {apiDataReducer} from '../../Reducers/APIDataReducer'
import {list, next} from '../../Reducers/APIDataPaginations'
import update from 'immutability-helper'


export const TOGGLE_ITEM_SELECT = 'TOGGLE_ITEM_SELECT'
export const TOGGLE_TASK_SELECTALL = 'TOGGLE_TASK_SELECTALL'
export const REQUEST_MORE = 'REQUEST_MORE'
export const REQUEST_MORE_SUCCESS = 'REQUEST_MORE_SUCCESS'
export const REQUEST_MORE_FAILURE = 'REQUEST_MORE_FAILURE'

export function _inventoryDetails(state, action) {
  let ns = apiDataReducer(state, action)
  return inventoryDetailExtension(ns, action)
}

function inventoryDetailExtension(state, action) {
  switch(action.type) {
    case TOGGLE_ITEM_SELECT:
      return toggleItemSelect(state, action)
    case TOGGLE_TASK_SELECTALL:
      return toggleSelectAll(state, action)
    case REQUEST_MORE:
      return requestMore(state, action)
    case REQUEST_MORE_SUCCESS:
      return requestMoreSuccess(state, action)
    case REQUEST_MORE_FAILURE:
      return requestMoreFailure(state, action)
    default:
      return state
  }
}

function toggleItemSelect(state, action) {
  let newVal = !(state.data[action.taskIndex].items[action.itemIndex].selected)

    // get the count of selected items 
    // after toggling this item's selection value
    let newCount = state.ui.selectedCount || 0
    if (newVal) {
      newCount = newCount + 1
    } else {
      newCount = newCount - 1
    }

    // update the state
    let ns = update(state, {
      data: {
        [action.taskIndex]: {
          items: {
            [action.itemIndex]: {
              $merge: {selected: newVal}
            }
          }
        }
      },
      ui: {
        $merge: {
          selectedCount: newCount
        }
      }
    })

    return ns
}

function toggleSelectAll(state, action) {
  let task = state.data[action.taskIndex]
  
  // get count of the selected items in this task
  let count = 0
  for (var item of task.items) {
    count += (item.selected ? 1 : 0)
  }

  // make a deep copy of the task object & selectedCount
  let newTask = update(task, {$merge: {}})
  let totalSelected = state.ui.selectedCount

  // if nothing was selected, select all, otherwise, 
  // unselect the selected stuff
  if (count == 0) {
    for (var i = 0; i < newTask.items.length; i++) {
      newTask.items[i].selected = true
      totalSelected += 1
    }
  } else {
    for (var i = 0; i < newTask.items.length; i++) {
      if (newTask.items[i].selected) {
        newTask.items[i].selected = false
        totalSelected -= 1
      }
    }
  }

  return update(state, {
    data: {
      [action.taskIndex]: {
        $set: newTask
      }
    }, ui: {
      $merge: {
        selectedCount: totalSelected
      }
    }
  })
}

function requestMore(state, action) {
  return update(state, {
    ui: {
      $merge: { isFetchingMore: true }
    }
  })
}

function requestMoreSuccess(state, action) {
  return update(state, {
    ui: {
      $merge: { 
        isFetchingMore: false, 
        next: next(action.data)
      }
    }, data: {
      $push: list(action.data)
    }
  })
}

function requestMoreFailure(state, action) {
    alert("Whoops! Something went wrong!")
    return update(state, {
    ui: {
      $merge: { isFetchingMore: false }
    }
  })
}

