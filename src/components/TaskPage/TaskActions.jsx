import api from '../WaffleconeAPI/api.jsx'
import * as actions from '../../reducers/APIDataActions'
import {
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
} from '../../reducers/APIDataReducer'
import {
    REQUEST_EDIT_TASK,
    REQUEST_EDIT_TASK_SUCCESS,
    REQUEST_EDIT_TASK_FAILURE,
    MARK_OUTPUT_USED,
} from '../../reducers/TaskReducerExtension'
import { TASK, TASKS, TASK_ANCESTORS, TASK_DESCENDENTS, MOVEMENTS } from '../../reducers/ReducerTypes'
import { get_active_user } from '../../utilities/userutils'
import update from 'immutability-helper'

export function getTask(task_id) {
  return dispatch => {

    dispatch(actions.getRequest(TASK))

    return api.get(`/ics/tasks/${task_id}`)
      .then(async (res) => {
        let processed = res.body
        processed.attributesWithValues = attributesWithValues(processed.process_type.attributes, processed.attribute_values)
        processed.task_ingredients = addInputsToTaskIngredients(processed.task_ingredients, processed.inputs)
        
        dispatch(getFileList(task_id))
        return dispatch(actions.requestSuccess(TASK, processed, null))
      })
      .catch(err => dispatch(actions.requestFailure(TASK, err)))
  }
}

export function getFileList(task_id) {
  return dispatch => {
    
    dispatch(requestEditTask())

    return api.get(`/ics/files/`)
      .query({task: task_id})
      .then((res) => {
        dispatch(requestEditTaskSuccess('files', res.body))
      })
      .catch(e => dispatch(requestEditTaskFailure(e)))
  }
}

function addInputsToTaskIngredients(taskIngredients, inputs) {
  return taskIngredients.map(ta => {
    const { ingredient } = ta
    // add all the inputs for this task ingredient
    ta.inputs = inputs.filter(input => {
      return ingredient.process_type.id === input.input_task_n.process_type &&
        ingredient.product_type.id === input.input_task_n.product_type
    })
    // set the process_type to be the full object
    ta.inputs.forEach(i => i.input_task_n.process_type = ingredient.process_type)
    return ta
  })
}

// Match each ProcessType.Attribute with its TaskAttributeValue (if they've been filled in)
// attribute.values = [...n] will contain n = 0 or 1 for non-recurring Attributes, n >= 0 for recurring Attributes
function attributesWithValues(attributes, attributeValues) {
  // Hash Attributes by id
  const attrByID = {}
  attributes.forEach(attr => {
    attr.values = []
		attrByID[attr.id] = attr
  })
	// Cluster recurring TaskAttributes into their respective Attributes
	attributeValues.forEach(attrValue => attrByID[attrValue.attribute].values.push(attrValue))
	// Sort Attributes in user-specified order (rank)
  const _attributesWithValues = Object.values(attrByID).sort((a, b) => a.rank - b.rank)
	// (In place) sort each attribute's values oldest to newest -- lets us display them properly, and predictably append new values to the end
	_attributesWithValues.forEach(taskAttribute => taskAttribute.values.sort((a,b) => new Date(a.created_at) - new Date(b.created_at)))

	// filter to show both attributes that are active (not trashed) and attributes that are trashed but have data in them
  return _attributesWithValues.filter(attr => {
    if (attr.is_recurrent) {
      return !attr.is_trashed || attr.values.length
    } else {
      return !attr.is_trashed || (attr.values.length && attr.values[attr.values.length - 1].value.length)
    }})
}

export function getTasks(query) {
  let request = {
    url: '/ics/tasks/',
    query: query,
  }
  return actions.fetch(TASKS, request, null, res => res.body)
}

export function getTaskAncestors(task) {
  let request = {
    url: '/ics/tasks/',
    query: { child: task }
  }
  return actions.fetch(TASK_ANCESTORS, request, null, res => res.body)
}

export function getTaskDescendents(task) {
  let request = {
    url: '/ics/tasks/',
    query: { parent: task }
  }
  return actions.fetch(TASK_DESCENDENTS, request, null, res => res.body)
}


export function markAsUsed(index, id) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    let team = 1
    let user_id = 1
    try {
      let user = get_active_user()
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
  console.error('Oh no! Something went wrong\n' + err)
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
      .then(() => dispatch(requestEditTaskSuccess("is_trashed", true)))
      .catch(e => console.log("Error", e))
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

function requestEditTaskFailure(err) {
  console.error('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_EDIT_TASK_FAILURE,
    name: TASK,
    error: err
  }
}

export function uploadTaskFiles(task, files_to_upload) {
  return function (dispatch) {
    dispatch(requestEditTask())
    let extraData = {
      task: task.id
    }
    
    let uploaded_files = JSON.parse(JSON.stringify(task.files));
    return api.upload(`/ics/files/`, files_to_upload[0], extraData)
      .then((res) => {
        uploaded_files.unshift(res.body)
        dispatch(requestEditTaskSuccess('files', uploaded_files))

        // recursively call uploadTaskFiles if there are more files to upload
        if (files_to_upload.length > 1) {
          var next_files_to_upload = update(files_to_upload, {
            $splice: [[0, 1]]
          })
          // create a task copy with an updated files array
          var new_task = update(task, {
            'files': {
              '$merge': uploaded_files
            }
          })
          // recursive call
          dispatch(uploadTaskFiles(new_task, next_files_to_upload))
        }

      })
      .catch(e => dispatch(requestEditTaskFailure(e)))
    }
}
