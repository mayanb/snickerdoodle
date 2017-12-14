import React from 'react'
import { connect } from 'react-redux'
import {data} from './data'
import {pluralize} from '../../utilities/stringutils'
import Alert from './Alert'

export default class AlertAnomalousInputs extends React.Component {
	render() {
		let tasks = this.props.anomalies
		if (!tasks || !tasks.length) {
			return false
		}
		
		let alert = `There are ${tasks.length} ${pluralize(tasks.length, 'task')} that have unlikely inputs. Check in to make sure everything's okay.`
		return (
			<Alert negative alert={alert}>
				{
					tasks.map(function (t, i) {
						return <AlertFlaggedTaskTitle key={i} id={t.id} display={t.task_display} />
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
				<span>{props.display}</span>
				<i className="material-icons">open_in_new</i>
			</a>
		</div>
	)
}
