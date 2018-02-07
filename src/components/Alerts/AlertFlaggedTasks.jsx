import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import {toArray} from '../../utilities/arrayutils'
import Alert from './Alert'

export default class AlertFlaggedTasks extends React.Component {
	render() {
		let { tasks, isFlagging } = this.props
		if (!tasks) 
			return false
		tasks = toArray(JSON.parse(tasks.variable_content))
		if (!tasks || !tasks.length) {
			return false
		}

		let alert = `You recently unflagged ${tasks.length} ${pluralize(tasks.length, 'task')}.`
		if(isFlagging) {
			alert =  `You have ${tasks.length} recently flagged ${pluralize(tasks.length, 'task')}.`
		}
		return (
			<Alert
				negative={isFlagging}
				positive={!isFlagging}
				alert={alert}
				details={tasks.map((t, i) => (<AlertFlaggedTaskTitle key={i} {...t} />))}
			/>
		)
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