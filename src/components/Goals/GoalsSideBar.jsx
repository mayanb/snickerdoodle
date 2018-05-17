import React from 'react'
import { connect } from 'react-redux'
import Loading from '../OldComponents/Loading.jsx'
import Goal from './Goal'
import './styles/goalssidebar.css'
import * as actions from "./GoalsActions";

class GoalsSideBar extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		let {users} = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchGoals(user.profile_id))
	}
	
	render() {
		const { weeklyGoals, monthlyGoals } = this.props
		if (!weeklyGoals)
			return <Loading/>
		if (weeklyGoals.ui.isFetchingData)
			return <Loading/>
		const groupedGoals = groupWeeklyAndMonthlyGoals(weeklyGoals.data, monthlyGoals.data)
		console.log(groupedGoals)
		return (
			<div className='goals-side-bar'>
				{groupedGoals.map((goalGroup, i) =>
					<Goal
						key={i}
						goalGroup={goalGroup}
						// onDelete={goal.onDelete}
					/>
				)}
			</div>
		)
	}
}

const groupWeeklyAndMonthlyGoals = (weeklyGoals, monthlyGoals) => {
	const groupedGoals = {}
	
	// process weekly goals
	weeklyGoals.forEach(weeklyGoal => {
		const productIds = getProductIds(weeklyGoal)
		groupedGoals[productIds] = {
			process_type: weeklyGoal.process_type,
			productIds: productIds,
			weeklyGoal: weeklyGoal,
		}
	})
	
	// add in monthly goals, combining when equal
	monthlyGoals.forEach(monthlyGoal => {
		const productIds = getProductIds(monthlyGoal)
		const weeklyGoal = groupedGoals[productIds]
		if (weeklyGoal && weeklyGoal.process_type === monthlyGoal.process_type) {
			weeklyGoal.monthlyGoal = monthlyGoal
		} else {
			groupedGoals[productIds] = {
				monthlyGoal: monthlyGoal,
				// no need to store other info (no more checking needed)
			}
		}
	})
	
	return Object.values(groupedGoals)
}

const getProductIds = (goal) => {
	if (goal.all_product_types) {
		// Keeps otherwise, goals will fail to match if new product type are created
		return 'all_product_type'
	}
	goal.product_code.map(product => product.id).sort()
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
