import React from 'react'
import { connect } from 'react-redux'
import {data} from './data'
import {pluralize} from '../../utilities/stringutils'
import Alert from './Alert'

export default class AlertFlaggedTasks extends React.Component {
	render() {
		let { tasks } = this.props
		var taskContent = JSON.parse(tasks.variable_content)
		if (!Array.isArray(taskContent)) {
			tasks = [taskContent]
		}
		if (!tasks || !tasks.length) {
			return false
		}
		
		let alert = `You have ${tasks.length} recently flagged ${pluralize(tasks.length, 'task')}.`
		return (
			<Alert negative alert={alert}>
				{
					tasks.map(function (t, i) {
						return <AlertFlaggedTaskTitle key={i} {...t} />
					})
				}
			</Alert>
		)
	}
}

function AlertFlaggedTaskTitle(props) {
	return (
		<div className="alert-flagged-task-title">
			<a href={`/task/${props.id}`} target="_blank">
				<div />
				<span>{props.display}</span>
				<i className="material-icons">open_in_new</i>
			</a>
		</div>
	)
}