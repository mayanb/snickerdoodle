import React from 'react'
import { formatAmount } from "../../utilities/stringutils"
import { Table, pl } from './TaskHelpers'

export default function TaskInputTable(props) {
	const { data } = props
  let grouped = {};
  (data.inputs || []).forEach(function (input, i) {
    if (grouped[input.input_task]) {
      grouped[input.input_task].push(input)
    } else {
      grouped[input.input_task] = [input]
    }
  })
  
  
  return (
    <Table title={'Inputs'}>
    {
      Object.values(grouped).map(function (group, i) {
        return (
            <a href={window.location.origin + '/task/' + group[0].input_task}
              target='_blank' key={i}
              className='task-attribute-table-row input-table-row'
            >
              <span>
                {group[0].input_task_display}
                <i className='material-icons expand-i'>open_in_new</i>
              </span>
              <span className='input-count'>{formatAmount(Math.round(parseInt(data.inputs[0].input_item_amount)), data.process_type.unit)}</span>
            </a>
        )
      })
    }
    </Table>
  )
}
