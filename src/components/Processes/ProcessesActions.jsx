import * as actions from '../../reducers/APIDataActions'
import {  PROCESSES } from '../../reducers/ReducerTypes'
import { updateRanksToMatchOrder } from '../../utilities/processutils'

const BASE_ENDPOINT = '/ics/processes'

export function fetchProcesses(query) {
  let request = { 
    url: BASE_ENDPOINT, 
    query: query,
  }
  return actions.fetch(PROCESSES, request, null, res => organizeAttributes(res.body))
}

function organizeAttributes(processes) {
  for (var p of processes) {
    p.attributes.sort((a, b) => a.rank - b.rank)
    p.attributes = p.attributes.filter(attribute => !attribute.is_trashed)
		updateRanksToMatchOrder(p.attributes)
  }
  return processes
}

export function postCreateProcess(json) {
  let request = {
    url: `${BASE_ENDPOINT}/`,
    data: json
  }
  return actions.postCreate(PROCESSES, request, null, res => res.body)
}

export function postDuplicateProcess(json) {
  let request = {
    url: `${BASE_ENDPOINT}/duplicate/`,
    data: json
  }
  return actions.postCreate(PROCESSES, request, null, res => res.body)
}

export function editProcess(json, index, processID) {
  let request = {
    url: `${BASE_ENDPOINT}/${processID}/`,
    data: json
  }
  return actions.patchEdit(PROCESSES, request, index, res => res.body)
}

export function postDeleteProcess(process, index) {
  let request = { 
    url: `${BASE_ENDPOINT}/${process.id}/`, 
    data: { is_trashed: true } 
  }
  return actions.softDelete(PROCESSES, request, index)
}

export function selectProcess(id) {
  return actions.select(PROCESSES, id)
}

export function pageProcesses(direction) {
  return actions.page(PROCESSES, direction)
}

