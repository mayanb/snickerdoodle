import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import * as types from './GoalTypes'
import * as actions from './GoalsActions'
import Goal from './Goal'
import GoalHeader from './GoalHeader'
import AddNewGoal from './AddNewGoal'
import Sortable from '../Sortable/Container'
import AddGoalDialog from './AddGoalDialog'
import DeleteGoalDialog from './DeleteGoalDialog'
import Button from '../Card/Button'
import Card from '../Card/Card'
import { pluralize } from '../../utilities/stringutils'

class Goals extends React.Component {

	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)

		this.state = {
			isAddingGoal: false,
			isDeletingGoal: null,
			isDeletingGoalIndex: -1,
		}
	}

	componentDidMount() {
		let {users, goals} = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchGoals(user.profile_id))
	}

	render() {
		let {users, goals, timerange} = this.props
		if (!goals) 
			return false

		let completed = 0
		let sortableGoals = []

		let hd = this.handleDelete

		goals.data.map(function (goal, i) {
			if (goal.actual >= goal.goal)
				completed += 1
			sortableGoals.push(
				update(
					goal, 
					{$merge: {goal: goal, editable: goals.ui.isEditing, onDelete: () => hd(goal, i) }}
				)
			)
		})

		return (
			<div className="goals">
				<div className="content">
					<GoalHeader timerange={timerange} editable={!this.props.goals.ui.isEditing} onClick={this.toggleEditing.bind(this)}/>
					<Sortable
						cards={sortableGoals} 
						canEdit={true} 
						finishMovingCard={this.moveGoal.bind(this)} 
						renderer={Goal} 
					/>
					<AddNewGoal onClick={() => this.setState({isAddingGoal: true})}/>
					{this.renderAddGoalDialog()}
					{this.renderDeleteGoalDialog()}
				</div>
			</div>
		)
	}

	toggleEditing() {
		this.props.dispatch(actions.toggleEditing(this.props.timerange))
	}

	moveGoal(id, toIndex) {
		let goal = this.props.goals.data.find(e => e.id === id)
			this.props.dispatch(actions.postRequestReorder(goal, toIndex))
	}

	renderBottomBar(completed, total) {
		let k = <span>You've reached <span>{completed}</span>{` of ${total} ${pluralize(total, 'goal')}.`}</span>
		if (total == 0) {
			k = <span>You have 0 goals. Start adding goals now!</span>
		}
		return (
			<div className="goals-bottom-bar">
				<div className="left">
					{ k }
				</div>
				<div className="right">
					<button onClick={() => this.setState({isAddingGoal: true})}>Add new goal</button>
				</div>
			</div>
		)
	}

	renderAddGoalDialog() {
		if (this.state.isAddingGoal)
			return <AddGoalDialog onToggle={() => this.setState({isAddingGoal: false})} />
		return null
	}

	renderDeleteGoalDialog() {
		if (this.state.isDeletingGoal)
			return <DeleteGoalDialog goal={this.state.isDeletingGoal} index={this.state.isDeletingGoalIndex} onToggle={() => this.setState({isDeletingGoal: null})} />
		return null
	}

	handleDelete(goal, i) {
		this.setState({isDeletingGoal: goal, isDeletingGoalIndex: i})
	}

}

const mapStateToProps = (state, props) => {
	let goals = state.weeklyGoals
	if (props.timerange === types.MONTHLY)
		goals = state.monthlyGoals

  return {
  	goals: goals,
    users: state.users
  }
}

const connectedGoals = connect(mapStateToProps)(Goals)

export default connectedGoals
