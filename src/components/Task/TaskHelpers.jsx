import moment from 'moment'
import React from 'react'
import { gerund } from '../../utilities/stringutils'

export function display(task) {
  return words(task).toUpperCase()
}

export function description(task) {
	const processed = task.process_type && task.process_type.name ? gerund(task.process_type.name) : 'Processed'
	const product = task.product_type && task.product_type.name ? task.product_type.name : 'a product'
	return `${processed} ${product} on ${moment(task.created_at).format('M/D')}`
}

export function getNotes(task) {
  var notesID = 0
  for (var attribute of task.process_type.attributes) {
    if(attribute.name.toLowerCase().trim() === "notes") {
      notesID = attribute.id
      break;
    }
  }

  for (var attributeVal of task.attribute_values) {
    if(attributeVal.attribute === notesID)
      return attributeVal.value
  }

  return ""
}

export function getOperator(task) {
  var notesID = 0
  for (var attribute of task.process_type.attributes) {
    if(attribute.name.toLowerCase().trim() === "operator") {
      notesID = attribute.id
      break;
    }
  }

  for (var attributeVal of task.attribute_values) {
    if(attributeVal.attribute === notesID)
      return attributeVal.value
  }

  return ""
}

export function words(task) {
  if (!task || task === undefined || task.label === undefined) {
    return ""
  }

  if (task.custom_display && task.custom_display !== "")
    return task.custom_display
  else if (task.label_index > 0)
    return task.label + "-" + task.label_index
  else
    return task.label
}

export function getAttributesToColumnNumbers(attributes) {
  var cols = {}
  attributes.forEach(function (a, i) {
    cols[a.id] = i
  })
  return cols
}

export function taskAsRow(process,task, cols) {
  var arr = [display(task), '' + task.inputs.length, '' + task.items.length, '' + moment(task.created_at).format("MM/DD/YYYY")]
  
  var attrArray = Array(process.attributes.length).fill('')
  
  task.attribute_values.forEach(function (av) {
    var col = cols[av.attribute]
    attrArray[col] = av.value.replace(/"/g, '""');
  })

  arr = arr.concat(attrArray)

  return '"' + arr.join('","') + '"'
}

export function toCSV(process, tasks) {

  var attributeColumns = getAttributesToColumnNumbers(process.attributes)

  var arr = ['Task', 'Inputs', 'Outputs', 'Date Created']
  var attrArr = process.attributes.map(function (a) { return a.name.replace(/"/g, '""') })

  var firstRow = [ '"' + arr.concat(attrArr).join('","') + '"']

  var tasksAsRows = tasks.map(function (task) {
    return taskAsRow(process,task, attributeColumns)
  })

  var csv = tasksAsRows.join('\n')

  return firstRow + '\n' + csv

}

export function icon(k) {
  var i = k.substr(0, k.length-4)
  return process.env.PUBLIC_URL + "/img/" + i + "@3x.png"
}

export function pl(count, unit) {
  if (count) {

  }
  if (count === 1)
    return count + " " + unit
  return count + " " + unit + "s"
}

export function TaskTable(props) {
  return (
    <Table title={props.title}>
    {
      props.tasks.map(function (task, i) {
        return (
          <a 
            href={window.location.origin + "/task/" + task.id} 
            target="_blank" key={i} 
            className="task-attribute-table-row input-table-row"
          >
            <span className="task-row-header">
            <img src={icon(task.process_type.icon)} alt="process type"/>
            {task.display}
            <i className="material-icons expand-i">open_in_new</i>
            </span>
            <span className=""></span>
          </a>
        )
      })
    }
    </Table>
  )
}

export function subs(qr) {
  return qr.substring(qr.length-6)
}

export function Table({children, title}) {
  let inside = (
    <div className="task-attribute-table-row zero-state zero-state-clean"> <span> Nothing to show here ¯ \_(ツ)_/¯ </span></div>
  )
  if (children) {
    inside = children
  }

  let header = false
  if (title) {
    header = (
      <div className="task-attribute-table-row task-attribute-table-row-header">
        <span>{title}</span>
        <span />
      </div>
    )
  }

  return (
    <div className="task-attribute-table">
      {header}
      {inside}
    </div>
  )
}

