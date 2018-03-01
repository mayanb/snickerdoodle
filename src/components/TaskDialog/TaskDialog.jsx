import React from 'react'
import { connect } from 'react-redux'
import './styles/taskdialog.css'
import DialogHeader from '../Dialog/DialogHeader'
import { icon, description } from '../Task/TaskHelpers.jsx'
import {Link} from 'react-router-dom'
import { HIDE_MODAL_TYPE } from '../../reducers/ModalReducer'
import { MODAL } from '../../reducers/ReducerTypes'

class TaskDialog extends React.Component {
	constructor(props) {
		super(props)

		this.renderTask = this.renderTask.bind(this)
		this.hideTaskDialog = this.hideTaskDialog.bind(this)
	}

	render() {
		return (
			<div className="dialog-container">
				<div className="dialog-shim" onClick={this.hideTaskDialog} />
				<div className={"dialog-card task-dialog"}>
					<DialogHeader onToggle={this.hideTaskDialog}>Tasks</DialogHeader>
					<div className="body">
						{this.props.tasks.map(this.renderTask)}
					</div>
				</div>
			</div>
		)
	}

	renderTask(task) {
		return (
			<Link key={task.id} className="task" to={`/task/${task.id}`} onClick={this.hideTaskDialog}>
				<ProcessTypeIcon task={task}/>
				<div className="info">
					<div className="code">{task.display}</div>
					<div className="name">{description(task)}</div>
				</div>
			</Link>
		)
	}

	hideTaskDialog() {
		this.props.dispatch({
			name: MODAL,
			type: HIDE_MODAL_TYPE,
		})
	}
}

function ProcessTypeIcon({task}) {
	const filename = task.process_type ? task.process_type.icon : ''
		return (
		<img className="task-icon" src={icon(filename)} alt="Process Type"/>
		)
}

export default connect(() => {})(TaskDialog)
