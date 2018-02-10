import React from 'react'
import Alert from './Alert'
import TaskDialog from '../TaskDialog/TaskDialog'
import { pluralize } from '../../utilities/stringutils'

export default class AlertFlaggedTasks extends React.Component {
	constructor(props) {
		super(props)
		this.state = { showAlertDetails: false }

		this.renderTaskDialog = this.renderTaskDialog.bind(this)
		this.toggleTaskDialog = this.toggleTaskDialog.bind(this)
	}

	render() {
		let { tasks, title, negative, positive } = this.props
		return (
			<Alert
				alert={title}
				negative={negative}
				positive={positive}
			>
				{tasks.slice(0, 3).map((t, i) => (<AlertFlaggedTaskTitle key={i} {...t} />))}
				{tasks.length > 3 ?
					<div className="view-all" onClick={this.toggleTaskDialog}>View all {tasks.length} tasks</div> :
					null
				}
				{this.renderTaskDialog()}
			</Alert>
		)
	}

	renderTaskDialog() {
		if (this.state.showAlertDetails) {
			return (
				<TaskDialog
					title={this.props.alert}
					tasks={this.props.tasks}
					onToggle={this.toggleTaskDialog}
				/>
			)
		} else {
			return null
		}
	}

	toggleTaskDialog() {
		this.setState({ showAlertDetails: !this.state.showAlertDetails })
	}
}

function AlertFlaggedTaskTitle(props) {
	return (
		<div className="alert-detail">
			<a href={`/task/${props.id}`} target="_blank">
				<div />
				<span>{props.display}</span>
				<i className="material-icons">open_in_new</i>
			</a>
		</div>
	)
}