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
    MARK_OUTPUT_USED,
} from '../../reducers/TaskReducerExtension'
import {  TASK, TASKS, TASK_ANCESTORS, TASK_DESCENDENTS, MOVEMENTS } from '../../reducers/ReducerTypes'
import { get_active_user } from '../../utilities/userutils'

export function getTask(task) {
  let request = { 
    url: `/ics/tasks/${task}`, 
    query: {}
  }
  return actions.fetch(TASK, request, null, res => {
    let task = res.body
    task.attributesWithValues = attributesWithValues(task.process_type.attributes, task.attribute_values)
    task.task_ingredients = addInputsToTaskIngredients(task.task_ingredients, task.inputs)
    return task
  })
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

function attributesWithValues(attributes, attributeValues) {
	const sortedAttributeValues = attributeValues.sort((a, b) => b.id - a.id) //Sort to find most recent
	return attributes.map(attribute => {
		const valueObject = sortedAttributeValues.find(val => val.attribute === attribute.id)
		attribute.value = valueObject ? valueObject.value : ''
		return attribute
	})
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