import React from 'react'
import { connect } from 'react-redux'
import * as actions from './TaskActions'
import * as attributeActions from './TaskAttributeActions'
import TaskHeader from './TaskHeader'
import ProductHistory from './ProductHistory'
import TaskMain from './TaskMain'
import TaskQR from './TaskQR'
import './styles/taskpage.css'

const TIME_TO_WAIT_FOR_COST_PROPAGATION_TO_FINISH = 2000

class TaskPage extends React.Component {
	constructor(props) {
		super(props)

		this.handleFlagTask = this.handleFlagTask.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleSaveAttribute = this.handleSaveAttribute.bind(this)
		this.handleSaveCost = this.handleSaveCost.bind(this)
		this.handleDropFiles = this.handleDropFiles.bind(this)
		this.handleCreateAttribute = this.handleCreateAttribute.bind(this)
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

	handleSaveAttribute(attributeID, taskAttributeID, value) {
		const task = this.props.task
		const index = task.attributesWithValues.findIndex(a => a.id === attributeID)
		let params = { taskAttributeID: taskAttributeID, task: task.id, value: value }
		return this.props.dispatch(attributeActions.saveEditingAttribute(index, params))
	}
	
	handleSaveCost(newCost) {
		return this.props.dispatch(actions.updateTaskCost(this.props.task, newCost))
			.then(() => {
				window.setTimeout(() => {
					console.log('Sending task refresh REQUEST');
					this.props.dispatch(actions.getTask(this.props.task.id)).then(() => console.log('fetching task is DONE.'))
				}, TIME_TO_WAIT_FOR_COST_PROPAGATION_TO_FINISH)
			})
	}
	
	handleCreateAttribute(attribute, value) {
		const task = this.props.task
		const index = task.attributesWithValues.findIndex(a => a.id === attribute)
		let params = { attribute: attribute, task: task.id, value: value }
		return this.props.dispatch(attributeActions.createEditingAttribute(index, params))
	}

	handleDropFiles(files) {
		const { task, dispatch } = this.props
		files.forEach(file => {
			dispatch(actions.uploadTaskFile(task, file))
		})
	}

	render() {
		let { task, teamTimeFormat } = this.props

		if (!task || task.length === 0)
			return null

		const qrCode = task.items.length && task.items[0].item_qr

		return (
			<div className="task-page">
				<TaskHeader task={task} onToggleFlag={this.handleFlagTask} />
				<div className="task-container">
					<ProductHistory />
					<TaskMain 
						task={task}
						attributes={task.attributesWithValues}
						onSaveAttribute={this.handleSaveAttribute}
						onSaveCost={this.handleSaveCost}
						onCreateAttribute={this.handleCreateAttribute}
						teamTimeFormat={teamTimeFormat}
					/>
					<TaskQR qrCode={qrCode} onDelete={this.handleDelete} onDropFiles={this.handleDropFiles} task={task} name={task.display} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		task: state.task.data,
		teamTimeFormat: state.users.data[state.users.ui.activeUser].user.time_format,
	}
}

export default connect(mapStateToProps)(TaskPage)

