import React from 'react'
import { connect } from 'react-redux'
import Img from '../Img/Img'
import * as goalActions from '../Goals/GoalsActions'
import './styles/productionaside.css'
import { formatAmount } from '../../utilities/stringutils'
import * as goalUtils from '../Goals/GoalUtils'

class ProductionAside extends React.Component {
	constructor(props) {
		super(props)
		
		this.props.dispatch(goalActions.fetchGoals())
	}

	render() {
		const { goals, selected } = this.props
		return (
			<div className='production-aside-container'>
				<div className='title'>In Production this Month</div>
				{ goals && goals.map(groupedGoal => this.renderGoal(groupedGoal, selected)) }
			</div>
		)
	}

	renderGoal(groupedGoal, selected) {
		const { info, w: weeklyGoal, m: monthlyGoal } = groupedGoal
		const { process_name, process_unit, product_code, process_id, product_id, inventory_amount } = info
		const warning = null // need to fetch if there are any raw materials running low for this Process/Product type
		let percent = 0
		if (monthlyGoal) {
			percent = monthlyGoal.actual / monthlyGoal.goal * 100
		} else if (weeklyGoal) {
			percent = weeklyGoal.actual / weeklyGoal.goal * 100
		}
		const goal_selected = process_id === parseInt(selected.process_id) && product_id === parseInt(selected.product_id) ? true : false

		return (
			<div className={`goal-container ${goal_selected ? 'selected' : ''}`} key={`${process_name} ${product_code}`} onClick={() => this.handleSelect(process_id, product_id)}>
				<ProgressBar percent={percent} />
				<div className='content-container'>
					<div className='title-container'>
						<div className='goal-title'>{`${process_name} ${product_code}`}</div>

						{ warning && 
							<div className='warning'>
								<Img src='warning@2x' height="20px" />
							</div> 
						}
					</div>
					<div className='info-container'>
						<div className='label'>In Inventory</div>
						<div className='value'>{formatAmount(inventory_amount, process_unit)}</div>
					</div>
					{ monthlyGoal && 
					<div className='info-container'>
						<div className='label'>Monthly Goal</div>
						<div className='value'>{`${monthlyGoal.actual ? monthlyGoal.actual : 0}/${monthlyGoal.goal}`}</div>
					</div>
					}
					{ weeklyGoal &&
					<div className='info-container'>
						<div className='label'>Weekly Goal</div>
						<div className='value'>{`${weeklyGoal.actual ? weeklyGoal.actual : 0}/${weeklyGoal.goal}`}</div>
					</div>
					}
				</div>
			</div>
		)
	}

	handleSelect(process_id, product_id) {
		this.props.onSelect(String(process_id), String(product_id))
	}
}

function ProgressBar({ percent }) {
	return (
		<div className='outer-progress-bar'>
			<div className='inner-progress-bar' style={{ width: `${percent}%` }}></div>
		</div>
	)
}

function formatGoals(goals) {
	const goalGroups = {}
	goals.forEach(goal => {
		if (!goal.is_trashed && !goal.all_product_types) {
			const goalKey = goalUtils.getProductProcessKey(goal)
			if (!goalGroups[goalKey]) {
				goalGroups[goalKey] = {}
			}
			goalGroups[goalKey].info = { 
				inventory_amount: goal.total_inventory_amount,
				process_id: goal.process_type,
				process_name: goal.process_name, 
				process_unit: goal.process_unit,
				product_id: goal.product_code[0].id,
				product_code: goal.product_code[0].code,
			}
			goalGroups[goalKey][goal.timerange] = { 
				actual: Math.round(goal.actual), 
				goal: Math.round(goal.goal) 
			}
		}
	})
	return Object.values(goalGroups)
}

const mapStateToProps = (state/*, props*/) => {
	const goals = formatGoals(state.goals.data)
	return { goals }
}

export default connect(mapStateToProps)(ProductionAside)
