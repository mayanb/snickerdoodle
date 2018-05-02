import React from 'react'
import './styles/taskdialog.css'
import DialogHeader from '../Dialog/DialogHeader'
import { icon, description } from '../TaskPage/TaskHelpers.jsx'
import {Link} from 'react-router-dom'
import Img from '../Img/Img'

export default class TaskDialogSimple extends React.Component {
	render() {
		return (
			<div className="dialog-container">
				<div className="dialog-shim" onClick={this.props.onToggle} />
				<div className={"dialog-card task-dialog"}>
					<DialogHeader onToggle={this.props.onToggle}>{this.props.header || 'Tasks'}</DialogHeader>
					<div className="body">
						{this.props.tasks.map(this.renderTask.bind(this))}
					</div>
				</div>
			</div>
		)
	}

	renderTask(task) {
		return (
			<Link key={task.id} target="_blank" className="task" to={`/task/${task.id}`}>
				<ProcessTypeIcon task={task}/>
				<div className="info">
					<div className="code">{task.display}</div>
					<div className="name">{description(task)}</div>
				</div>
			</Link>
		)
	}
}

function ProcessTypeIcon({task}) {
	const filename = task.process_type ? task.process_type.icon : ''
		return (
		<Img className="task-icon" src={icon(filename)}/>
		)
}
