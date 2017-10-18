import React from 'react'
import GoalBar from './GoalBar'

export default function Goal(props) {
  return (
    <div className="goal">

      <div className="goal-details">
        <div className="goal-details-left">
          <span className="product">{props.goal.process_name + " " + props.goal.product_code}</span>
          <span>{`${parseInt(props.goal.actual)}/${parseInt(props.goal.goal)} ${props.goal.process_unit.toUpperCase()}(S)`}</span>
        </div>
        <div className="goal-details-right goal-buttons">
          <button className="secondary" onClick={props.onDelete}><i className="material-icons">delete_forever</i></button>
        </div>
      </div>
      <GoalBar {...props} />
      <div className="goal-buttons">
      </div>
    </div>
  )
}