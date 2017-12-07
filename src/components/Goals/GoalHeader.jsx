import React from "react"
import Button from '../Card/Button'
import * as types from './GoalTypes'

export default function GoalHeader(props) {
	return (
		<div className="goal-header" style={{display: "flex"}}>
			<span style={{display: "block", flex: "1"}} className="card-header">{props.timerange === types.WEEKLY ? 'Weekly Goals' : 'Monthly Goals'}</span>
			<Button secondary onClick={props.onClick}>{props.editable?"Edit":"Cancel"}</Button>
		</div>
	)
}