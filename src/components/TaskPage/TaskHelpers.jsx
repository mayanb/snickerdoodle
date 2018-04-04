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

