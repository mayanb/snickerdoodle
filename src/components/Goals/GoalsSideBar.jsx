import React from 'react'
import { connect } from 'react-redux'
import Loading from '../OldComponents/Loading.jsx'
import Tabs from '../Tabs/Tabs'
import Goal from './Goal'
import './styles/goalssidebar.css'
import * as actions from "./GoalsActions";

const PINNNED_TITLE = 'Pinned'
const ALL_GOALS_TITLE = 'All Goals'

class GoalsSideBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = { pinnedTabActive: false }
		
		this.handleTab = this.handleTab.bind(this)
	}
	
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
		
		const { pinnedTabActive } = this.state
		const groupedGoals = this.groupWeeklyAndMonthlyGoals(weeklyGoals.data, monthlyGoals.data)
		const tabs = [
			{title: PINNNED_TITLE, active: pinnedTabActive, img: pinnedTabActive ? 'pinblue@3x' : 'pin@3x'},
			{title: ALL_GOALS_TITLE, active: !pinnedTabActive},
		]
		return (
			<div className="goals-side-bar">
				<div className="goal-side-bar-tabs">
					<Tabs tabs={tabs} onTab={this.handleTab}/>
				</div>
				<div className='goals-list-wrapper'>
					{this.displayGoals(groupedGoals)}
				</div>
			</div>
		)
	}
	
	handleTab(tab) {
		if (tab.title === PINNNED_TITLE) {
			this.setState({ pinnedTabActive: true })
		} else {
			this.setState({ pinnedTabActive: false })
		}
	}
	
	displayGoals(groupedGoals) {
		const { pinnedTabActive } = this.state
		if (groupedGoals.length === 0) {
			return <div className="goals-zero-state">{`No ${pinnedTabActive ? 'pins' : 'goals' }`}</div>
		} else {
			return (
				groupedGoals.map((goalGroup, i) => <Goal key={i} goalGroup={goalGroup}/>
				)
			)
		}
	}
	
	groupWeeklyAndMonthlyGoals(weeklyGoals, monthlyGoals) {
		const groupedGoals = {}
		const { pinnedTabActive } = this.state
		
		// Process weekly goals
		weeklyGoals.forEach(weeklyGoal => {
			if (!pinnedTabActive || weeklyGoal.isPinned) { // CHANGE ME: PLACEHOLDER UNTIL WE CAN PROPERLY DISPLAY PINS***
				const productIds = getProductIds(weeklyGoal)
				groupedGoals[productIds] = {
					process_type: weeklyGoal.process_type,
					productIds: productIds,
					weeklyGoal: weeklyGoal,
				}
			}
		})
		
		// Add in monthly goals, combining when equal
		monthlyGoals.forEach(monthlyGoal => {
			if (!pinnedTabActive || monthlyGoal.isPinned) { // CHANGE ME: PLACEHOLDER UNTIL WE CAN PROPERLY DISPLAY PINS***
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
			}
		})
		
		return Object.values(groupedGoals)
	}
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
