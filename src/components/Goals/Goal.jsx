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
				{/*<Img className="inventory-icon" src={`${goal.process_icon.split('.png')[0]}@3x`} />*/}
			</div>
			<div className="goal-info">
					<div className="goal-details">
						<span className="product">
							{goal.process_name + " " + getProductDisplay(goal.product_code, goal.all_product_types)}
							{/*{(goal.product_code.length >= 4) && }*/}
						</span>
					</div>
				<div className="goal-bars-wrapper">
					<GoalBar goal={weeklyGoal} />
					<GoalBar goal={monthlyGoal} />
				</div>
			</div>
		</div>
	)
}

function getProductDisplay(productTypes, allProducts) {
	if (allProducts) {
		return 'All Products'
	} else if (productTypes.length < 4) {
		return productTypes.map(p => p.code).join(', ')
	} else {
		const moreCount = productTypes.length - 2
		return `${productTypes.slice(0, 2).map(p => p.code).join(', ')} + ${moreCount} more`
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