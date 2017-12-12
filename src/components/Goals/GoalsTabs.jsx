import {connect} from 'react-redux'
import React from 'react'
import * as actions from './GoalsActions'
import * as types from './GoalTypes'
import Tabs from '../Tabs/Tabs'

class GoalsTabs extends React.Component {
	render() {
		let tabs = [
			{title: "Monthly", type: types.MONTHLY, active: !this.props.weeklyIsActive},
			{title: "Weekly", type: types.WEEKLY, active: this.props.weeklyIsActive},
		]
		return (
			<Tabs tabs={tabs} onTab={this.handleTab.bind(this)}/>
		)
	}

	handleTab(t) {
		this.props.dispatch(actions.switchActiveGoalType(t.type))
	}
}

const mapStateToProps = (state, props) => {
  return {
  	weeklyIsActive: state.weeklyGoals.ui.active
  }
}
export default connect(mapStateToProps)(GoalsTabs)
