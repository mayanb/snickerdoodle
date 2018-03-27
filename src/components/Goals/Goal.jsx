import React from 'react'
import GoalBar from './GoalBar'
import Img from '../Img/Img'
import {pluralize} from '../../utilities/stringutils'

export default function Goal(props) {
  return (
    <div className="goal">
      <div className="remove-goal" style={{display: props.editable?"block":"none"}}>
        <i className="material-icons">reorder</i>
        <i className="material-icons" onClick={props.onDelete}>remove_circle</i>
      </div>
      <div className="goal-main">
        <div className="goal-details">
          <div className="goal-details-left">
            <Img className="inventory-icon" src="foil@3x" style={{height: "16px", paddingRight: "6px"}}/>
            <span className="product">{props.goal.process_name + " " + get_product_display(props.goal.product_code, props.goal.all_product_types)}</span>
            <span className="more">{get_more_display(props.goal.product_code, props.goal.all_product_types)}</span>
          </div>
          <div className="goal-details-right goal-buttons">
            <span className="blue">{(props.goal.actual && !isNaN(props.goal.actual))?parseInt(props.goal.actual, 10):"0"}</span><span>{`/${parseInt(props.goal.goal, 10)} ${pluralize(parseInt(props.goal.goal, 10), props.goal.process_unit)}`}</span>
          </div>
        </div>
        <GoalBar {...props} />
        <div>Created by: {props.goal.username_created_by}</div>
      </div>
    </div>
  )
}

function get_product_display(product_code, all) {
  if (all) {
    return '(all products)'
  }

  if (product_code.length < 3) {
    return product_code.map(e => e.code).join(', ')
  } else {
    return product_code[0].code + ", " + product_code[1].code
  }
}

function get_more_display(product_code, all) {
  if (all) 
    return ''

  if (product_code.length < 3) {
    return ""
  } else {
    return `and ${product_code.length - 2} more`
  }
}