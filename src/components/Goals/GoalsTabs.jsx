import {connect} from 'react-redux'
import React from 'react'
import * as actions from './GoalsActions'
import * as types from './GoalTypes'
import Tabs from '../Tabs/Tabs'
import Button from '../Card/Button'

let wrapper_style = { display: "flex" }
let tab_style = { flex: 1 }
let btn_style = { flex: 0, paddingBottom: "12px", lineHeight: "20px" }

class GoalsTabs extends React.Component {
	constructor(props) {
		super(props)
		this.toggleEditing = this.toggleEditing.bind(this)
		this.handleTab = this.handleTab.bind(this)
	}
	render() {
		let tabs = [
			{title: "Monthly", type: types.MONTHLY, active: !this.props.weeklyIsActive},
			{title: "Weekly", type: types.WEEKLY, active: this.props.weeklyIsActive},
		]
		return (
			<div style={wrapper_style}>
				<div style={tab_style}>
					<Tabs tabs={tabs} onTab={this.handleTab}/>
				</div>
				<Button link style={btn_style} onClick={this.toggleEditing}>Edit</Button>
			</div>
		)
	}

	handleTab(t) {
		this.props.dispatch(actions.switchActiveGoalType(t.type))
	}

	toggleEditing() {
		this.props.dispatch(actions.toggleEditing(this.props.timerange))
	}
}

const mapStateToProps = (state, props) => {
  return {
  	weeklyIsActive: state.weeklyGoals.ui.active
  }
}
export default connect(mapStateToProps)(GoalsTabs)
