import React from 'react'
import Alert from './Alert'
import { connect } from 'react-redux'
import { SHOW_MODAL_TYPE } from '../../reducers/ModalReducer'
import { MODAL } from '../../reducers/ReducerTypes'

class AlertFlaggedTasks extends React.Component {
	constructor(props) {
		super(props)

		this.showTaskDialog = this.showTaskDialog.bind(this)
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
					<div className="view-all" onClick={this.showTaskDialog}>View all {tasks.length} tasks</div> :
					null
				}
			</Alert>
		)
	}

	showTaskDialog() {
		this.props.dispatch({
			name: MODAL,
			type: SHOW_MODAL_TYPE,
			modalType: 'TASK_DIALOG',
			modalProps: {
				title: this.props.alert,
				tasks: this.props.tasks
			}
		})
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

export default connect(() => {})(AlertFlaggedTasks)