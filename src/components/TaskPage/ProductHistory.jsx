import React from 'react'
import { connect } from 'react-redux'
import pluralize from 'pluralize'
import Loading from '../Loading/Loading'
import TaskSummary from './ProductHistoryTaskSummary'
import TaskDialogSimple from '../TaskDialog/TaskDialogSimple'
import './styles/producthistory.css'

class ProductHistory extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTaskIngredient: undefined,
		}
	}

	render() {
		const { task, ancestors, descendents, ancestorsUI, descendentsUI } = this.props
		return (
			<div className="product-history">
				<div className="title">
					Product History
				</div>
				<Loading isFetchingData={ancestorsUI.isFetchingData}>
					<div>
						{ancestors.map(t => <TaskSummary task={t} key={t.id} />)}
					</div>
				</Loading>
				<div className="focus-box">
					{task.taskIngredients.map(e => this.renderTaskIngredient(e))}
					<InputsLabel count={task.inputs.length} />
					<TaskSummary task={task} selected={true} />
				</div>
				<Loading isFetchingData={descendentsUI.isFetchingData}>
					<div>
						{descendents.map(t => <TaskSummary task={t} key={t.id} />)}
					</div>
				</Loading>
				{ this.renderTaskDialog() }
			</div>
		)
	}

	renderTaskDialog() {
		const { selectedTaskIngredient } = this.state
		return selectedTaskIngredient && (
			<TaskDialogSimple
				header={getTaskIngredientDisplay(selectedTaskIngredient)}
				onToggle={() => this.setState({ selectedTaskIngredient: undefined})}
				tasks={selectedTaskIngredient.inputs.map(e => e.input_task_n)} 
			/>
		)
	}

	renderTaskIngredient(taskIngredient) {
		let formattedTI = { 
			...taskIngredient,
			isTaskIngredient: true,
			process_type: taskIngredient.ingredient.process_type, 
			product_type: taskIngredient.ingredient.product_type,
			total_amount: taskIngredient.actual_amount,
			display: getTaskIngredientDisplay(taskIngredient)
		} 
		return (
			<TaskSummary 
				task={formattedTI}
				key={formattedTI.id}
				onClick={() => this.setState({ selectedTaskIngredient: formattedTI })}
			/>
		)
	}
}

function getTaskIngredientDisplay(ti) {
	let displayName = `${ti.ingredient.process_type.code}-${ti.ingredient.product_type.code}`
	let displayCount = `(${ti.inputs.length} ${pluralize('input', ti.inputs.length)})`
	return `${displayName} ${displayCount}`
}

function InputsLabel({ count }) {
	if (!count)
		return null

	return (
		<div className="inputs-label">
			<i className="material-icons">arrow_downward</i>
			{`${count} ${pluralize('input', count)}`}
		</div>
	)
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