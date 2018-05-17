import React from 'react'
import { connect } from 'react-redux'
import Loading from '../OldComponents/Loading.jsx'
import Goal from './Goal'
import './styles/goalssidebar.css'
import * as actions from "./GoalsActions";

class GoalsSideBar extends React.Component {
	
	componentDidMount() {
		let {users} = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchGoals(user.profile_id))
	}
	
	render() {
		const { weeklyGoals, monthlyGoals } = this.props
		if (!weeklyGoals || !monthlyGoals || weeklyGoals.ui.isFetchingData) {
			return <Loading/>
		}
		
		const groupedGoals = groupWeeklyAndMonthlyGoals(weeklyGoals.data, monthlyGoals.data)
		
		return (
			<div className='goals-side-bar'>
				{groupedGoals.map((goalGroup, i) =>
					<Goal
						key={i}
						goalGroup={goalGroup}
					/>
				)}
			</div>
		)
	}
}

const groupWeeklyAndMonthlyGoals = (weeklyGoals, monthlyGoals) => {
	const groupedGoals = {}
	
	// Process weekly goals
	weeklyGoals.forEach(weeklyGoal => {
		const productIds = getProductIds(weeklyGoal)
		groupedGoals[productIds] = {
			process_type: weeklyGoal.process_type,
			productIds: productIds,
			weeklyGoal: weeklyGoal,
		}
	})
	
	// Add in monthly goals, combining when equal
	monthlyGoals.forEach(monthlyGoal => {
		const productIds = getProductIds(monthlyGoal)
		const weeklyGoalGroup = groupedGoals[productIds]
		if (weeklyGoalGroup && weeklyGoalGroup.process_type === monthlyGoal.process_type) {
			weeklyGoalGroup.monthlyGoal = monthlyGoal
		} else {
			groupedGoals[productIds] = { // Also consolidates any duplicate goals
				monthlyGoal: monthlyGoal,
				// No need to store other info (not needed to verify matches)
			}
		}
	})
	
	return Object.values(groupedGoals)
}

// Returns a unique process/product(s) identifier used as the key of the hashmap to group weekly/monthly goals
const getProductIds = (goal) => {
	if (goal.all_product_types) {
		// Otherwise, goals will fail to match if new product type are created: [idA, idB] !== [idA, idB, newId]
		return 'all_product_type' + String(goal.process_type)
	}
	// Returns something unique like [25, 37, "Rotary Conche Pull12"]
	const productIds = goal.product_code.map(product => product.id).sort()
	productIds.push(`${goal.process_name}${String(goal.process_type)}`)
	return productIds
}

const mapStateToProps = (state, props) => {
	return {
		weeklyGoals: state.weeklyGoals,
		monthlyGoals: state.monthlyGoals,
		users: state.users,
	}
}

const connectedGoalsSideBar = connect(mapStateToProps)(GoalsSideBar)

export default connectedGoalsSideBar
