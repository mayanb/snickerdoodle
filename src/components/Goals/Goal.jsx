import React from 'react'
import GoalBar from './GoalBar'

export default function Goal(props) {
  return (
    <div className="goal">

      <div className="goal-details">
        <div className="goal-details-left">
          <span className="product">{props.goal.process_name + " " + props.goal.product_code}</span>
          <button className="secondary" onClick={props.onDelete}><i className="material-icons">delete_forever</i></button>
        </div>
        <div className="goal-details-right goal-buttons">
          <span className="blue">{(props.goal.actual && !isNaN(props.goal.actual))?parseInt(props.goal.actual):"0"}</span><span>{`/${parseInt(props.goal.goal)} ${props.goal.process_unit.toUpperCase()}(S)`}</span>
        </div>
      </div>
      <GoalBar {...props} />
      <div className="goal-buttons">
      </div>
    </div>
  )
}