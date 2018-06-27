import React from 'react'
import { connect } from 'react-redux'
import * as actions from './TaskActions'
import * as attributeActions from './TaskAttributeActions'
import TaskHeader from './TaskHeader'
import ProductHistory from './ProductHistory'
import TaskMain from './TaskMain'
import TaskQR from './TaskQR'
import './styles/taskpage.css'

class TaskPage extends React.Component {
	constructor(props) {
		super(props)

		this.handleFlagTask = this.handleFlagTask.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleSaveAttribute = this.handleSaveAttribute.bind(this)
	}

	componentWillReceiveProps(np) {
		if (np.match.params.id !== this.props.match.params.id) {
			this.loadTask(np.match.params.id)
		}
	}

	componentDidMount() {
		this.loadTask(this.props.match.params.id)
	}

	loadTask(id) {
		this.props.dispatch(actions.getTask(id))
		this.props.dispatch(actions.getTaskAncestors(id))
		this.props.dispatch(actions.getTaskDescendents(id))
	}

	handleFlagTask() {
		this.props.dispatch(actions.toggleTask(this.props.task))
	}

	handleDelete() {
		this.props.dispatch(actions.deleteTask(this.props.task))
			.then(() => this.props.history.push('/activity-log'))
	}

	handleSaveAttribute(attributeId, value) {
		const task = this.props.task
		const index = task.attributesWithValues.findIndex(a => a.id === attributeId)
		let params = { attribute: attributeId, task: task.id, value: value }
		return this.props.dispatch(attributeActions.saveEditingAttribute(index, params))
	}

	render() {
		let { task, teamTimeFormat } = this.props


		if (!task || task.length === 0)
			return null

		const qrCode = task.items.length && task.items[0].item_qr
		console.log(task)

		return (
			<div className="task-page">
				<TaskHeader task={task} onToggleFlag={this.handleFlagTask} />
				<div className="task-container">
					<ProductHistory />
					<TaskMain 
						task={task}
					  attributes={task.attributesWithValues}
					  onSaveAttribute={this.handleSaveAttribute}
					  teamTimeFormat={teamTimeFormat}
					/>
					<TaskQR qrCode={qrCode} onDelete={this.handleDelete} name={task.display} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	console.log(state.users.data[state.users.ui.activeUser].user.time_format)

	return {
		task: state.task.data,
		teamTimeFormat: state.users.data[state.users.ui.activeUser].user.time_format,
	}
}

export default connect(mapStateToProps)(TaskPage)

