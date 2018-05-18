import React from 'react'
import GoalBar from './GoalBar'
import Img from '../Img/Img'
import {connect} from "react-redux"
import './styles/goal.css'

function Goal(props) {
	const weeklyGoal =  props.goalGroup.weeklyGoal
	const monthlyGoal =  props.goalGroup.monthlyGoal
	const goal = weeklyGoal ? weeklyGoal : monthlyGoal
	console.log(goal)
	return (
		<div className="goal">
			<div className="goal-icon">
				<Img className="inventory-icon" src={`${goal.process_icon.split('.png')[0]}@3x`} />
			</div>
			<div className="goal-info">
				<div className="goal-details">
					<div className="goal-details-left">
						<span className="product">
							{goal.process_name + " " + getProductDisplay(goal.product_code, goal.all_product_types)}
						</span>
					</div>
				</div>
				<div className="goal-bars-wrapper">
					<GoalBar goal={weeklyGoal} />
					<GoalBar goal={monthlyGoal} />
				</div>
			</div>
		</div>
	)
}

function getProductDisplay(product_code, all) {
	if (all) {
		return 'All Products'
	}
	
	if (product_code.length < 3) {
		return product_code.map(e => e.code).join(', ')
	} else {
		return product_code[0].code + ", " + product_code[1].code
	}
}

const mapStateToProps = (state, props) => {
	let goals = state.monthlyGoals
	if (state.weeklyGoals.ui.active) {
		goals = state.weeklyGoals
	}
	
	return { goals: goals }
}

const connectedGoal = connect(mapStateToProps)(Goal)

export default connectedGoal