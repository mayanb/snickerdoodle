import React from 'react'
import { connect } from 'react-redux'
import Loading from '../OldComponents/Loading.jsx'
import Tabs from '../Tabs/Tabs'
import Goal from './Goal'
import './styles/goalssidebar.css'
import * as actions from "./GoalsActions"
import { GOALS, PINS } from '../../utilities/constants'
import * as utils from './GoalUtils'


const PINNNED_TITLE = 'Pinned'
const ALL_GOALS_TITLE = 'All Goals'

class GoalsSideBar extends React.Component {
	constructor(props) {
		super(props)
		
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
		
		const { pinsTabIsActive } = this.props
		const groupedGoals = this.groupedGoals()
		const tabs = [
			{title: PINNNED_TITLE, active: pinsTabIsActive, img: pinsTabIsActive ? 'pinblue@3x' : 'pin@3x'},
			{title: ALL_GOALS_TITLE, active: !pinsTabIsActive},
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
			this.props.setActiveTabTo(PINS)
		} else {
			this.props.setActiveTabTo(GOALS)
		}
	}
	
	displayGoals(groupedGoals) {
		const { pinsTabIsActive } = this.props
		if (groupedGoals.length === 0) {
			return <div className="goals-zero-state">{`No ${pinsTabIsActive ? 'pins' : 'goals' }`}</div>
		} else {
			return (
				groupedGoals.map((goalGroup, i) => <Goal key={i} goalGroup={goalGroup}/>
				)
			)
		}
	}
	
	groupedGoals() {
		const { goals, pins, pinsTabIsActive } = this.props
		const groupedGoals = {}

		pins.forEach(pin => {
			const key = utils.getProductProcessKey(pin)
			if (!groupedGoals[key]) {
				groupedGoals[key] = {}
			}
			groupedGoals[key].pin = pin
		})

		goals.forEach(goal => {
			const key = utils.getProductProcessKey(goal)

			if (!groupedGoals[key]) {
				groupedGoals[key] = {}
			}
			if (goal.timerange === 'w') {
				groupedGoals[key].weeklyGoal = goal
			} else {
				groupedGoals[key].monthlyGoal = goal
			}
		})


		if (pinsTabIsActive) {
			return Object.values(groupedGoals).filter(goal => goal.pin)
		} else {
			return Object.values(groupedGoals).filter(goal => goal.weeklyGoal || goal.monthlyGoal)
		}
	}
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
