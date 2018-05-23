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
		this.props.dispatch(actions.fetchGoals())
	}
	
	render() {
		const { goals, goalsUI } = this.props
		if (!goals || goalsUI.isFetchingData) {
			return <Loading/>
		}
		
		const { pinnedTabActive } = this.state
		const groupedGoals = this.groupedGoals()
		const tabs = [
			{title: PINNNED_TITLE, active: pinnedTabActive, img: pinnedTabActive ? 'pinblue@3x' : 'pin@3x'},
			{title: ALL_GOALS_TITLE, active: !pinnedTabActive},
		]
		const heightOfNavBarAndTabsHeader = 129
		const listWrapperHeight = window.innerHeight - heightOfNavBarAndTabsHeader
		return (
			<div className="goals-side-bar">
				<div className="goal-side-bar-tabs">
					<Tabs tabs={tabs} onTab={this.handleTab}/>
				</div>
				<div className='goals-list-wrapper' style={{ height: listWrapperHeight }}>
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
	
	groupedGoals() {
		const { goals, pins } = this.props
		const groupedGoals = {}

		pins.forEach(pin => {
			const key = getProductProcessKey(pin)
			if (!groupedGoals[key]) {
				groupedGoals[key] = {}
			}
			groupedGoals[key].pin = pin
		})

		goals.forEach(goal => {
			const key = getProductProcessKey(goal)

			if (!groupedGoals[key]) {
				groupedGoals[key] = {}
			}
			if (goal.timerange === 'w') {
				groupedGoals[key].weeklyGoal = goal
			} else {
				groupedGoals[key].monthlyGoal = goal
			}
		})


		if (this.state.pinnedTabActive) {
			return Object.values(groupedGoals).filter(goal => goal.pin)
		} else {
			return Object.values(groupedGoals).filter(goal => goal.weeklyGoal || goal.monthlyGoal)
		}
	}
}



// Returns a unique process/product(s) identifier used as the key of the hashmap to group weekly/monthly goals
const getProductProcessKey = (goal) => {
	const productIDs = goal.all_product_types ? 'ALL' : goal.product_code.map(product => product.id).sort().join(',')
	return `${productIDs}_${String(goal.process_type)}`
}

const mapStateToProps = (state, props) => {
	return {
		goals: state.goals.data,
		pins: state.pins.data,
		goalsUI: state.goals.ui,
		users: state.users,
	}
}

const connectedGoalsSideBar = connect(mapStateToProps)(GoalsSideBar)

export default connectedGoalsSideBar
