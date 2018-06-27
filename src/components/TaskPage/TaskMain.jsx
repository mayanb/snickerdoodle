import React from 'react'
import './styles/taskmain.css'
import TaskForm from './TaskForm'
import { formatAmount, getProcessIcon } from '../../utilities/stringutils'
import moment from 'moment'
import Img from '../Img/Img'

export default class TaskMain extends React.Component {
	render() {
		const { task, attributes, onSaveAttribute, onCreateAttribute, teamTimeFormat } = this.props
		return (
			<div className="task-main">
				<div className="task-main-container">
					<TaskName task={task} />
					<TaskInfo task={task} />
					<TaskForm
						taskAttributes={attributes}
						onSave={onSaveAttribute}
						onCreate={onCreateAttribute}
						teamTimeFormat={teamTimeFormat}
					/>
				</div>
			</div>
		)
	}
}

function TaskName({ task }) {
	return (
		<div className="task-name">
			<div className="last-updated">
				Last Updated {moment(task.updated_at).format('dddd, MMMM Do YYYY, h:mm a')}
			</div>
			<div className="name-row">
				<Img src={getProcessIcon(task.process_type.icon)} />
				<div>
					<span className="name">{task.display}</span>
					<i className="material-icons">arrow_forward</i>
					<span className="default-output">{formatAmount(task.total_amount, task.process_type.unit)}</span>
				</div>
			</div>
		</div>
	)
}

function TaskInfo({ task }) {
	return (
		<div className="task-info">
			<div className="group">
				<div className="label">Process</div>
				<div className="value">{task.process_type.name}</div>
			</div>
			<div className="group">
				<div className="label">Product</div>
				<div className="value">{task.product_type.name}</div>
			</div>
			<div className="group">
				<div className="label">Created at</div>
				<div className="value">{moment(task.created_at).format('MM/DD/YY h:mm a')}</div>
			</div>
			<div className="group">
				<div className="label">Team</div>
				<div className="value">{task.process_type.team_created_by_name}</div>
			</div>
			<div className="group">
				<div className="label">Output</div>
				<div className="value">{formatAmount(task.total_amount, task.process_type.unit)}</div>
			</div>
		</div>
	)
}

