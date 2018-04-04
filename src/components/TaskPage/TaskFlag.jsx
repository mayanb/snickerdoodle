import React from 'react'
import './styles/taskflag.css'

export default function TaskFlag(props) {
	if (!props.flagged)
		return null 

	return (
		<div className="task-flag">
			<div>
				<span>This task is flagged.</span>
			</div>
			<div className="task-flag-unflag" onClick={props.onUnflag}>
				<span>Unflag</span>
			</div>
		</div>
	)
}