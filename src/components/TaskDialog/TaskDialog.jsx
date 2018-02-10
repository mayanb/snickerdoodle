import React from 'react'
import './styles/taskdialog.css'
import DialogHeader from '../Dialog/DialogHeader'
import { icon, description } from '../Task/TaskHelpers.jsx'
import {Link} from 'react-router-dom'

export default function TaskDialog(props) {
	return (
		<div className="dialog-container">
			<div className="dialog-shim" onClick={props.onToggle} />
			<div className={"dialog-card task-dialog"}>
				<DialogHeader onToggle={props.onToggle}>Tasks</DialogHeader>
				<div className="body">
					{props.tasks.map(Task)}
				</div>
			</div>
		</div>
	)
}

function Task(task)  {
	return (
		<Link key={task.id} className="task" to={`/task/${task.id}`}>
			<ProcessTypeIcon task={task}/>
			<div className="info">
				<div className="code">{task.display}</div>
				<div className="name">{description(task)}</div>
			</div>
		</Link>
	)
}

function ProcessTypeIcon({task}) {
	const filename = task.process_type ? task.process_type.icon : ''
		return (
		<img className="task-icon" src={icon(filename)} alt="Process Type"/>
		)
}

