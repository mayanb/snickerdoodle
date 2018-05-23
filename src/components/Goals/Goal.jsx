import React from 'react'
import { Tooltip } from 'antd';
import GoalBar from './GoalBar'
import Img from '../Img/Img'
import { getProcessIcon } from '../../utilities/stringutils'
import {connect} from "react-redux"
import { Link } from 'react-router-dom'
import './styles/goal.css'

const MAX_PRODUCTS_COUNT = 2

function Goal(props) {
	const weeklyGoal =  props.goalGroup.weeklyGoal
	const monthlyGoal =  props.goalGroup.monthlyGoal
	const goal = weeklyGoal ? weeklyGoal : monthlyGoal
	const path = constructPath(goal)
	return (
		<Link to={path} className="goal">
			<div className="goal-icon">
				<Img src={getProcessIcon(goal.process_icon)} />
			</div>
			<div className="goal-info">
				<div className="goal-name">
					{getGoalName(goal)}
				</div>
				<div className="goal-bars-wrapper">
					<GoalBar goal={weeklyGoal} />
					<GoalBar goal={monthlyGoal} />
				</div>
			</div>
		</Link>
	)
}

function constructPath(goal) {
	const selectedProcess = goal.process_type
	const selectedProducts = goal.all_product_types ? '' : goal.product_code.map(p => p.id).join(',')
	const qs = new URLSearchParams()
	qs.set('selectedProcess', selectedProcess)
	qs.set('selectedProducts', selectedProducts )
	return`/?${qs.toString()}`
}

function getGoalName(goal) {
	const text = goal.process_name + " " + getProductDisplay(goal.product_code, goal.all_product_types)
	
	if (goal.all_product_types || goal.product_code.length <= MAX_PRODUCTS_COUNT) {
		return (
			<span className="product">
				{text}
			</span>
		)
	} else {
		return (
			<Tooltip title={getHoverText(goal.product_code)}>
			<span className="product">
				{text}
			</span>
			</Tooltip>
		)
	}
}

function getHoverText(productTypes) {
	return `${productTypes.map(p => p.code).join(', ')}`
}

function getProductDisplay(productTypes, allProducts) {
	if (allProducts) {
		return 'All Products'
	} else if (productTypes.length <= MAX_PRODUCTS_COUNT) {
		return productTypes.map(p => p.code).join(', ')
	} else {
		const moreCount = productTypes.length - MAX_PRODUCTS_COUNT
		return `${productTypes.slice(0, MAX_PRODUCTS_COUNT).map(p => p.code).join(', ')} + ${moreCount} more`
	}
}

const mapStateToProps = (state, props) => {
	return { goals: state.goals }
}

const connectedGoal = connect(mapStateToProps)(Goal)

export default connectedGoal