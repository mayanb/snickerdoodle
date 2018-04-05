import React from 'react'
import { formatAmount } from "../../utilities/stringutils"
import { Table } from './TaskHelpers'

export default function TaskInputTable(props) {
	const { data } = props
  let groupedByTask = {};
  (data.inputs || []).forEach(function (input, i) {
    if (groupedByTask[input.input_task]) {
      groupedByTask[input.input_task].push(input)
    } else {
      groupedByTask[input.input_task] = [input]
    }
  })

  // For each unique task, only  group[0] is displayed (!?)
  return (
    <Table title={'Inputs'}>
    {
      Object.values(groupedByTask).map(function (group, i) {
        return (
            <a href={window.location.origin + '/task/' + group[0].input_task}
              target='_blank' key={i}
              className='task-attribute-table-row input-table-row'
            >
              <span>
                {group[0].input_task_display}
                <i className='material-icons expand-i'>open_in_new</i>
              </span>
              <span className='input-count'>{getInputAmountDisplayText(group)}</span>
            </a>
        )
      })
    }
    </Table>
  )
}

function getInputAmountDisplayText(group) {
	const amount = isNewDataModel(group) ? group.amount : group[0].input_item_amount
	return formatAmount(amount, group[0].unit)
}

function isNewDataModel(group) {
  return group.amount
}