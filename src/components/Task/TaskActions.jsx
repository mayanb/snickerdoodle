import api from '../WaffleconeAPI/api.jsx'
import moment from 'moment'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
} from '../../reducers/APIDataReducer'
import {
    REQUEST_EDIT_TASK,
    REQUEST_EDIT_TASK_SUCCESS,
    MARK_OUTPUT_USED,
} from '../../reducers/TaskReducerExtension'
import {  TASK, TASK_ANCESTORS, TASK_DESCENDENTS, MOVEMENTS } from '../../reducers/ReducerTypes'

export function getTask(task) {

  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestTask())
    // actually fetch 
    return api.get(`/ics/tasks/${task}/`)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestTaskFailure(err))
        } else {
          let organized = organizeAttributes(res.body)
          dispatch(requestTaskSuccess(organized))
        }
      })
  }
}

function organizeAttributes(task) {
  let attributes = task.process_type.attributes
  let values = task.attribute_values

  let organized_attrs = [
    {attribute: -1, value: task.process_type.name, name: "Process", isEditable: false},
    {attribute: -1, value: task.product_type.name, name: "Product", isEitable: false},
    {attribute: -1, value: task.process_type.team_created_by_name, name: "Production Team", isEditable: false},
    {attribute: -1, value: moment(task.created_at).format('MM/DD/YY h:mm a'), name: "Created at", isEditable: false},
    {attribute: -1, value: moment(task.updated_at).format('MM/DD/YY h:mm a'), name: "Updated at", isEditable: false},
  ]

  attributes.forEach(function (attr, i) {
    let val = values.find(function (e) {
      return (e.attribute === attr.id)
    })
    organized_attrs.push({attribute: attr.id, value: val?val.value:"", name: attr.name, isEditable: true, isEditing: false})
  })
  task.organized_attrs = organized_attrs
  return task
}

function requestTask() {
  return {
    type: REQUEST,
    name: TASK
  }
}

function requestTaskFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: TASK

  }
}

function requestTaskSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    name: TASK,
    data: json, 
  }
}

export function getTaskAncestors(task) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestTaskAncestors())
    return api.get('/ics/tasks')
      .query({child: task})
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestTaskAncestorsFailure(err))
        } else {
          dispatch(requestTaskAncestorsSuccess(res.body, task))
        }
      })
  }
}

function requestTaskAncestors() {
  return {
    type: REQUEST,
    name: TASK_ANCESTORS
  }
}

function requestTaskAncestorsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: TASK_ANCESTORS

  }
}

function requestTaskAncestorsSuccess(json, id) {
  return {
    type: REQUEST_SUCCESS,
    name: TASK_ANCESTORS,
    data: json, 
    task: id

  }
}


export function getTaskDescendents(task) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestTaskDescendents())
    return api.get('/ics/tasks')
      .query({parent: task})
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestTaskDescendentsFailure(err))
        } else {
          dispatch(requestTaskDescendentsSuccess(res.body, task))
        }
      })
  }
}

function requestTaskDescendents() {
  return {
    type: REQUEST,
    name: TASK_DESCENDENTS
  }
}

function requestTaskDescendentsFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: TASK_DESCENDENTS

  }
}

function requestTaskDescendentsSuccess(json, id) {
  return {
    type: REQUEST_SUCCESS,
    name: TASK_DESCENDENTS,
    index: id,
    data: json,
  }
}


export function markAsUsed(index, id) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    let team = 1
    let user_id = 1
    try {
      let users = JSON.parse(window.localStorage.getItem('users-v5'))
      let user = users.data[users.ui.activeUser].user
      team = user.team
      user_id = user.user_id
    } catch(e) {

    }

    dispatch((requestCreateMovement()))

    return api.post('/ics/movements/create/')
      .send({ 
        status: "RC", 
        team_origin: team, 
        team_destination: null,  
        origin: user_id,
        destination: null,
        notes: "MARK AS USED",
        items: [ {item: id}] 
      })
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestCreateMovementFailure(err))
        } else {
          dispatch(requestCreateMovementSuccess(id))
          dispatch(requestMarkOutputAsUsed(index))

          // dispatch(requestOutputDeleteSuccess(id))
        }
      })
  }
}

function requestCreateMovement() {
  return {
    type: REQUEST_CREATE,
    name: MOVEMENTS
  }
}

function requestCreateMovementFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_CREATE_FAILURE,
    name: MOVEMENTS

  }
}

function requestCreateMovementSuccess(id) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    name: MOVEMENTS,
    item: id 
  }
}

function requestMarkOutputAsUsed(id) {
  return {
    type: MARK_OUTPUT_USED,
    name: TASK,
    index: id 
  }
}


export function closeTask(task) {
  return function (dispatch) {

    dispatch((requestEditTask()))

    return api.put(`/ics/tasks/edit/${task.id}/`)
      .send({ 
        is_open: false,
        label: task.label,
        label_index: task.label_index,
        custom_display: task.custom_display,
        is_trashed: task.is_trashed,
        is_flagged: task.is_flagged,
        experiment: null 
      })
      .end(function (err, res) {
        if (err || !res.ok) {
          //dispatch(requestEditTaskFailure(err))
        } else {
          dispatch(requestEditTaskSuccess("is_open", false))
        }
      })
  }
}

export function toggleTask(task) {
  console.log("toggle")
  console.log(task)
  let flag = !(task.is_flagged)
  return function (dispatch) {
    dispatch((requestEditTask()))
    return api.put(`/ics/tasks/edit/${task.id}/`)
      .send({ 
        is_open: task.is_open,
        label: task.label,
        label_index: task.label_index,
        custom_display: task.custom_display,
        is_trashed: task.is_trashed,
        is_flagged: flag, 
        experiment: null 
      })
      .end(function (err, res) {
        if (err || !res.ok) {
          //dispatch(requestEditTaskFailure(err))
        } else {
          dispatch(requestEditTaskSuccess("is_flagged", flag))
          //dispatch(requestEditTaskSuccessExtension(index))
        }
      })
  }
}

export function deleteTask(task) {
  console.log("delete")
  console.log(task)
  return function (dispatch) {
    dispatch((requestEditTask()))
    return api.put(`/ics/tasks/edit/${task.id}/`)
      .send({ 
        is_open: task.is_open,
        label: task.label,
        label_index: task.label_index,
        custom_display: task.custom_display,
        is_trashed: true,
        is_flagged: task.is_flagged, 
        experiment: null 
      })
      .end(function (err, res) {
        if (err || !res.ok) {
          //dispatch(requestEditTaskFailure(err))
        } else {
          dispatch(requestEditTaskSuccess("is_trashed", true))
          //dispatch(requestEditTaskSuccessExtension(index))
        }
      })
  }
}


function requestEditTask() {
  return {
    type: REQUEST_EDIT_TASK,
    name: TASK

  }
}

function requestEditTaskSuccess(field, value) {
  return {
    type: REQUEST_EDIT_TASK_SUCCESS,
    name: TASK,
    field: field,
    value: value
  }
}