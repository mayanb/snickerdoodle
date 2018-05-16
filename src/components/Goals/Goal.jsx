import React from 'react'
import GoalBar from './GoalBar'
import Img from '../Img/Img'
import {formatAmount} from '../../utilities/stringutils'
import {connect} from "react-redux"
import './styles/goal.css'

function Goal(props) {
	return (
		<div className="goal">
			<div className="goal-icon">
				<Img className="inventory-icon" src="foil@3x" />
			</div>
			<div className="goal-info">
				<div className="goal-details">
					<div className="goal-details-left">
          <span className="product">
            {props.goal.process_name + " " + getProductDisplay(props.goal.product_code, props.goal.all_product_types)}
          </span>
						<span className="more">
            {getMoreDisplay(props.goal.product_code, props.goal.all_product_types)}
          </span>
					</div>
					<div className="goal-details-right goal-buttons">
          <span className="blue">
            {ifNaNSetToZero(props.goal.actual)}
          </span>
						<span>
            {`/${formatAmount(Math.round(props.goal.goal.goal), props.goal.process_unit)}`}
          </span>
					</div>
				</div>
				<GoalBar {...props} />
			</div>
		</div>
	)
}

function ifNaNSetToZero(num) {
	return (num && !isNaN(num)) ? parseInt(num, 10) : "0"
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

function getMoreDisplay(product_code, all) {
	if (all)
		return ''
	
	if (product_code.length < 3) {
		return ""
	} else {
		return `and ${product_code.length - 2} more`
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