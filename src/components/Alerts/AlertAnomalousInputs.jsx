import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import Alert from './Alert'
import {toArray} from '../../utilities/arrayutils'

export default class AlertAnomalousInputs extends React.Component {
	render() {
		if (!this.props.anomalies) {
			return false
		}

		let tasks = toArray(JSON.parse(this.props.anomalies.variable_content))
		if (!tasks || !tasks.length) {
			return false
		}

		// filter for unique tasks
		var task_ids = {}
		tasks.filter(function (t) {
			if (task_ids[t.task]) {
				return false
			} 
			task_ids[t.task] = t
			return true
		})
		
		let alert = `There are ${tasks.length} ${pluralize(tasks.length, 'task')} that have unlikely inputs. Check in to make sure everything's okay.`
		return (
			<Alert
				negative alert={alert}
				details={tasks.map((t, i) => (<AlertFlaggedTaskTitle key={i} id={t.task} display={t.task_display} />))}
			/>
		)
	}
}

function AlertFlaggedTaskTitle(props) {
	return (
		<div className="alert-detail">
			<a href={`/task/${props.id}`} target="_blank">
				<span>{props.display}</span>
				<i className="material-icons">open_in_new</i>
			</a>
		</div>
	)
}