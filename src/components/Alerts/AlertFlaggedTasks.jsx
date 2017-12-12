import React from 'react'
import { connect } from 'react-redux'
import {data} from './data'
import {pluralize} from '../../utilities/stringutils'
import Alert from './Alert'

class AlertFlaggedTasks extends React.Component {
	render() {
		let { tasks } = this.props
		let alert = `You have ${tasks.length} recently flagged ${pluralize(tasks.length, 'task')}.`
		return (
			<Alert alert={alert}>
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

const mapStateToProps = (state, props) => {
	return {
		tasks: data
	}
}

export default connect(mapStateToProps)(AlertFlaggedTasks)