import api from '../WaffleconeAPI/api.jsx'

export const FETCH_PROCESSES = 'FETCH_PROCESSES'
export const REQUEST_PROCESSES = 'REQUEST_PROCESSES'
export const REQUEST_PROCESSES_SUCCESS = 'REQUEST_PROCESSES_SUCCESS'
export const REQUEST_PROCESSES_FAILURE = 'REQUEST_PROCESSES_FAILURE'

export const SELECT_PROCESS = 'SELECT_PROCESS'

export const FETCH_PROCESS_INVENTORY = 'FETCH_PROCESS_INVENTORY'
export const REQUEST_PROCESS_INVENTORY = 'REQUEST_PROCESS_INVENTORY'
export const REQUEST_PROCESS_INVENTORY_SUCCESS = 'REQUEST_PROCESS_INVENTORY_SUCCESS'
export const REQUEST_PROCESS_INVENTORY_FAILURE = 'REQUEST_PROCESS_INVENTORY_FAILURE'

export const PAGE_PROCESSES = 'PAGE_PROCESSES' 

export function fetchProcesses() {
  return function (dispatch) {
    // dispatch an action that we are requesting a process
    dispatch(requestProcesses())

    // actually fetch 
    return api.get('/ics/processes/')
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestProcessesFailure(err))
        } else {
          let processes = formatProcessResponse(res.body)
          dispatch(requestProcessesSuccess(processes))
        }
      })
  }
}

function requestProcesses() {
  return {
    type: REQUEST_PROCESSES,
  }
}

function requestProcessesFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_PROCESSES_FAILURE
  }
}

function requestProcessesSuccess(json) {
  return {
    type: REQUEST_PROCESSES_SUCCESS,
    data: json, 
  }
}

export function fetchProcessInventory(process) {
  return function (dispatch) {
    // dispatch an action that we are requesting inventory
    dispatch(requestProcessInventory())

    return api.get('/ics/inventory')
      //.query({processes: process.code})
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
    type: REQUEST_PROCESS_INVENTORY
  }
}

function requestProcessInventoryFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    type: REQUEST_PROCESS_INVENTORY_FAILURE
  }
}

function requestProcessInventorySuccess(json, id) {
  return {
    type: REQUEST_PROCESS_INVENTORY_SUCCESS,
    data: json,
    id: id
  }
}


export function selectProcess(id) {
  return {
    type: SELECT_PROCESS,
    id: id
  }
}


function formatProcessResponse(json) {
  let processes = {}
  
  if (!json)
    return {}

  for (var p of json) {
    processes[p.id] = p
  }
  return processes
}

export function pageProcesses(direction) {
  return {
    type: PAGE_PROCESSES,
    direction: direction
  }
}


