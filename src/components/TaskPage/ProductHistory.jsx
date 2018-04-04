import React from 'react'
import './styles/producthistory.css'
import { formatAmount } from '../../utilities/stringutils'
import { icon } from './TaskHelpers.jsx'

export default class ProductHistory extends React.Component {
	render() {
		const { task } = this.props
		console.log('task', task)
		return (
			<div className="product-history">
				<div className="title">
					Product History
				</div>
				<div className="focus-box">
					{task.inputs.map(input => <TaskSummary task={input.input_task_n} key={input.id} />)}
					<TaskSummary task={task} selected={true} />
				</div>
			</div>
		)
	}
}

function TaskSummary({ task, selected }) {
	const amount = task.process_type.unit ? formatAmount(task.total_amount, task.process_type.unit) : 'Unknown Amount'
	return (
		<div className={'task-summary ' + (selected ? 'selected' : '')}>
			<div className="task-icon">
				{task.process_type.icon && <img src={icon(task.process_type.icon)} alt="process type" />}
			</div>
			<div className="task-text">
				<div className="task-name">
					{task.label || task.display}
				</div>
				<div className="task-amount">
					{amount}
				</div>
			</div>
		</div>
	)
}