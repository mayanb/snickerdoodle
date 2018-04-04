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

  var arr = ['TaskPage', 'Inputs', 'Outputs', 'Date Created']
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

export function OutputTable(props) {
  // let team = window.localStorage.getItem("team") || "1"
  let users = JSON.parse(window.localStorage.getItem('users-v5'))
  let user = users.data[users.ui.activeUser].user
  let team = user.team
  return (
    <Table title={`Outputs (${(props.outputs || []).length})`}>
    {
      (props.outputs || []).map(function (item, i) {
        let isInInventory = (!item.is_used && item.team_inventory && item.team_inventory.toString() === team)
        var inventory = false
        var markAsUsed = false
        if (isInInventory) {
          inventory = <span className="items-inventory"><div className="inv-circle"></div>Inventory</span>
          markAsUsed = <button className="small-mark-button" onClick={() => props.onMark(i, item.id)} >MARK AS USED</button>
        }
        return (
          <div key={item.id} className="task-attribute-table-row output-table-row">
            <span className="items-qr">
              <i className="material-icons">select_all</i>
              {subs(item.item_qr)}
              <button style={{display: "none"}}className="small-print-button">PRINT</button>
              {markAsUsed}
            </span>
            <span className="items-inventory">{inventory}</span>
          </div>
        )
      })
    }
    </Table>
  )
}

export function InputTable(props) {
  let grouped = {};
  (props.inputs || []).forEach(function (input, i) {
    if (grouped[input.input_task]) {
      grouped[input.input_task].push(input)
    } else {
      grouped[input.input_task] = [input]
    }
  })
  return (
    <Table title={`Inputs (${(props.inputs || []).length})`}>
    {
      Object.values(grouped).map(function (group, i) {
        return (
            <a href={window.location.origin + "/task/" + group[0].input_task} 
              target="_blank" key={i} 
              className="task-attribute-table-row input-table-row"
            >
              <span>
                {group[0].input_task_display}
                <i className="material-icons expand-i">open_in_new</i>
              </span>
              <span className="input-count">{pl(group.length, "item")}</span>
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

export function Table(props) {
  let inside = (
    <div className="task-attribute-table-row zero-state zero-state-clean"> <span> Nothing to show here ¯ \_(ツ)_/¯ </span></div>
  )
  if (props.children) {
    inside = props.children
  }

  let header = false
  if (props.title) {
    header = (
      <div className="task-attribute-table-row task-attribute-table-row-header">
        <span>{props.title}</span>
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

