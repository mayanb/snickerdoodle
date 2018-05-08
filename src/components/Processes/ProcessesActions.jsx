import api from '../WaffleconeAPI/api.jsx'
import {
	REQUEST,
	REQUEST_SUCCESS,
	REQUEST_FAILURE,
	REQUEST_CREATE,
	REQUEST_CREATE_SUCCESS,
	REQUEST_CREATE_FAILURE,
	REQUEST_EDIT_ITEM,
	REQUEST_EDIT_ITEM_SUCCESS,
	REQUEST_EDIT_ITEM_FAILURE,
	REQUEST_DELETE,
	REQUEST_DELETE_SUCCESS,
	REQUEST_DELETE_FAILURE,
	SELECT,
	PAGE,
} from '../../reducers/APIDataReducer'
import {  PROCESSES, PROCESS_INVENTORY } from '../../reducers/ReducerTypes'
import {alphabetize} from '../../utilities/arrayutils.jsx'


export function fetchProcesses(q) {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestProcesses())

    // actually fetch 
    return api.get('/ics/processes/')
	    .query(q)
      .then(res =>{
				dispatch(requestProcessesSuccess(organize_attributes(res.body.sort(alphabetize))))
			})
      .catch(err => dispatch(requestProcessesFailure(err)))
  }
}

function organize_attributes(processes) {
  for (var p of processes) {
    p.attributes.sort((a, b) => a.rank - b.rank)
  }
  return processes
}

function requestProcesses() {
  return {
    type: REQUEST,
    name: PROCESSES
  }
}

function requestProcessesFailure(err) {
  console.log('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: PROCESSES

  }
}

function requestProcessesSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    name: PROCESSES,
    data: json, 
  }
}

export function fetchProcessInventory(process) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestProcessInventory())

    return api.get('/ics/processesinventory/')
      .query({processes: process.code})
      .end(function (err, res) {
        if (err || !res.ok) {
          dispatch(requestProcessInventoryFailure(err))
        } else {
          dispatch(requestProcessInventorySuccess(res.body, process.id))
        }
      })
  }
}

function requestProcessInventory() {
  return {
    type: REQUEST,
    name: PROCESS_INVENTORY
  }
}

function requestProcessInventoryFailure(err) {
  console.log('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_FAILURE,
    name: PROCESS_INVENTORY

  }
}

function requestProcessInventorySuccess(json, id) {
  return {
    type: REQUEST_SUCCESS,
    name: PROCESS_INVENTORY,
    data: json,
    index: id
  }
}


export function selectProcess(id) {
  return {
    type: SELECT,
    index: id,
    name: PROCESSES
  }
}

export function postCreateProcess(json, success) {
  return function (dispatch) {
    dispatch(requestCreateProcess())
	  return api.post('/ics/processes/')
		  .send(json)
		  .send({ icon: "default.png" })
		  .then((res) => dispatch(requestCreateProcessSuccess(res.body)))
		  .catch((err) => dispatch(requestCreateProcessFailure(err)))
  }
}

export function postDuplicateProcess(json, success) {
  return function (dispatch) {
    dispatch(requestCreateProcess())
    return api.post('/ics/processes/duplicate/')
      .send(json)
      .send({ icon: "default.png" })
      .then((res) => dispatch(requestCreateProcessSuccess(res.body)))
      .catch((err) => dispatch(requestCreateProcessFailure(err)))
  }
}

export function editProcess(json, index, processID) {
	return function (dispatch) {
		dispatch(requestEditProcess(index))
		return api.patch(`/ics/processes/${processID}/`)
			.send(json)
			.then((res) => dispatch(requestEditProcessSuccess(res.body, index)))
			.catch((err) => dispatch(requestEditProcessFailure(err)))
	}
}

// Edit helpers

function requestEditProcess(index) {
	return {
		type: REQUEST_EDIT_ITEM,
		name: PROCESSES,
    index: index
	}
}

function requestEditProcessSuccess(json, index) {
	return {
		type: REQUEST_EDIT_ITEM_SUCCESS,
		name: PROCESSES,
		index: index,
    updatedObject: json,
	}
}

function requestEditProcessFailure(err, index) {
	console.log(err)
	return {
		type: REQUEST_EDIT_ITEM_FAILURE,
		name: PROCESSES,
		error: err,
		index: index,
	}
}

// Create helpers

function requestCreateProcess() {
  return {
    type: REQUEST_CREATE, 
    name: PROCESSES
  }
}

function requestCreateProcessFailure(err) {
  console.log(err)
  return {
    type: REQUEST_CREATE_FAILURE,
    name: PROCESSES,
    error: err,
  }
}

function requestCreateProcessSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: alphabetize,
    name: PROCESSES,
  }
}

export function postDeleteProcess(p, index) {
  return function (dispatch) {
    dispatch(requestDeleteProcess(index))
    return api.patch(`/ics/processesx/${p.id}/`)
      .send({ 
        name: p.name,
        code: p.code,
        created_by: p.created_by,
        team_created_by: p.team_created_by,
        is_trashed: true,
      })
      .then(() => dispatch(requestDeleteProcessSuccess(index)))
      .catch(err => {
        dispatch(requestDeleteProcessFailure(index, err))
        throw err
      })
  }
}

function requestDeleteProcess(index) {
  return {
    type: REQUEST_DELETE,
    index: index,
    name: PROCESSES
  }
}

function requestDeleteProcessFailure(index, err) {
  return {
    type: REQUEST_DELETE_FAILURE,
    index: index,
    name: PROCESSES,
    error: err
  }
}

function requestDeleteProcessSuccess(index) {
  return {
    type: REQUEST_DELETE_SUCCESS,
    name: PROCESSES,
    index: index,
  }
}

export function pageProcesses(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: PROCESSES

  }
}


