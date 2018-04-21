import React from 'react'
import { connect } from 'react-redux'
import './styles/producthistory.css'
import { formatAmount, pluralize } from '../../utilities/stringutils'
import { icon } from './TaskHelpers.jsx'
import Loading from '../Loading/Loading'
import Img from '../Img/Img'
import { consolidateInputsFromSameTask } from '../../utilities/arrayutils'

class ProductHistory extends React.Component {
	render() {
		const { task, ancestors, descendents, ancestorsUI, descendentsUI } = this.props
		return (
			<div className="product-history">
				<div className="title">
					Product History
				</div>
				<Loading isFetchingData={ancestorsUI.isFetchingData}>
					<div>
						{consolidateInputsFromSameTask(ancestors).map(t => <TaskSummary task={t} key={t.id} />)}
					</div>
				</Loading>
				<div className="focus-box">
					{task.inputs.map(input => <TaskSummary task={input.input_task_n} key={input.id} />)}
					<InputsLabel count={task.inputs.length} />
					<TaskSummary task={task} selected={true} />
				</div>
				<Loading isFetchingData={descendentsUI.isFetchingData}>
					<div>
						{consolidateInputsFromSameTask(descendents).map(t => <TaskSummary task={t} key={t.id} />)}
					</div>
				</Loading>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const ancestors = state.taskAncestors.data || []
	const descendents = state.taskDescendents.data || []
	return {
		task: state.task.data,
		ancestors: ancestors,
		ancestorsUI: state.taskAncestors.ui,
		descendents: descendents,
		descendentsUI: state.taskDescendents.ui,
	}
}

export default connect(mapStateToProps)(ProductHistory)


function TaskSummary({ task, selected, history }) {
	const amount = task.total_amount || (task.items && task.items.reduce((sum, item) => sum + Number(item.amount), 0))
	const formattedAmount = amount ? formatAmount(amount, task.process_type.unit) : '(Unknown Amount)'
	const is_ancestor_flagged = !task.is_flagged && task.num_flagged_ancestors > 0
	return (
		<a
			className={'task-summary ' + (selected ? 'selected' : '')}
			href={window.location.origin + "/task/" + task.id}
			target="_blank"
		>
			<div className="task-icon">
				{task.process_type.icon && <Img src={icon(task.process_type.icon)}/>}
			</div>
			<div className="task-text">
				<div className={"task-name " + (task.is_flagged && "task-flagged-name ") + (is_ancestor_flagged && " task-ancestor-flagged-name")}>
					{task.is_flagged && <i className= "task-flagged material-icons">error</i>}
					{is_ancestor_flagged && <i className= "task-ancestor-flagged material-icons">error</i>}
					{task.display}
				</div>
				<div className="task-amount">
					{formattedAmount}
				</div>
			</div>
			<i className="material-icons expand-i">open_in_new</i>
		</a>
	)
}

function InputsLabel({ count }) {
	if (!count)
		return null

	return (
		<div className="inputs-label">
			<i className="material-icons">arrow_downward</i>
			{`${count} ${pluralize(count, 'input')}`}
		</div>
	)
}