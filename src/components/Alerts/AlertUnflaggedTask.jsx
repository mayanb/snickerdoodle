import React from 'react'
import Alert from './Alert'

export default function AlertUnflaggedTask(props) {
	let task = props.task
	let alert = (
		<span>{"Task "} 
			<a href={`/task/${task.task}`} target="_blank" className="alert-link">
				{task.task_display}
			</a> 
			{" was recently resolved."}
		</span>
	)
	return (
		<Alert alert={alert} />
	)
}
