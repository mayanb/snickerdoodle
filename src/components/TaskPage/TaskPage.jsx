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

	componentDidMount() {
		let id = this.props.match.params.id
		this.props.dispatch(actions.getTask(id))
	}

	handleFlagTask() {
		this.props.dispatch(actions.toggleTask(this.props.data))
	}

	handleDelete() {
		this.props.dispatch(actions.deleteTask(this.props.data))
			.then(() => this.props.history.push('/activity-log'))
	}

	handleSaveAttribute(attributeId, value) {
		const data = this.props.data
		let task = this.props.data.id
		const index = data.attributesWithValues.findIndex(a => a.id === attributeId)
		let params = { attribute: attributeId, task: task, value: value }
		return this.props.dispatch(attributeActions.saveEditingAttribute(index, params))
	}

	render() {
		let { task } = this.props

		if (!task || task.length === 0)
			return null

		const qrCode = task.items.length && task.items[0].item_qr

		return (
			<div className="task-page">
				<TaskHeader task={task} onToggleFlag={this.handleFlagTask} />
				<div className="task-container">
					<ProductHistory task={task}>
					</ProductHistory>
					<TaskMain task={task}
					          attributes={task.attributesWithValues}
					          onSaveAttribute={this.handleSaveAttribute}
					/>
					<TaskQR qrCode={qrCode} onDelete={this.handleDelete} name={task.label} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		task: state.task.data,
	}
}
const connectedTask = connect(mapStateToProps)(TaskPage)
export default connectedTask

