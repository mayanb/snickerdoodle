import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import * as actions from './GoalsActions'
import GoalsTabs from './GoalsTabs'
import AddNewGoal from './AddNewGoal'
import GoalsByUsername from './GoalsByUsername'
import AddGoalDialog from './AddGoalDialog'
import DeleteGoalDialog from './DeleteGoalDialog'
import Loading from '../OldComponents/Loading.jsx'
import { pluralize } from '../../utilities/stringutils'
import * as types from './GoalTypes'
import './styles/goals.css'

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
		let {users} = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchGoals(user.profile_id))
	}

	render() {
		let {goals} = this.props
		console.log(goals)
		if (!goals) 
			return this.renderLoadingGoals()
		if (goals.ui.isFetchingData)
			return this.renderLoadingGoals()

		let goalsByUsername = {}

		let handleDelete = this.handleDelete

		goals.data.forEach(function (goal, i) {
			const username = goal.username_created_by
			if (!goalsByUsername[username])
                goalsByUsername[username] = []
			goalsByUsername[username].push(
				update(
					goal, {
						$merge: { goal: goal, editable: goals.ui.isEditing, onDelete: () => handleDelete(goal, i) }
					}
				)
			)
		})

		return (
			<div className="goals">
				<div className="content">
					<GoalsTabs />
					{Object.keys(goalsByUsername).map((username, i) =>
						<GoalsByUsername key={i} index={i} username={username} goals={goalsByUsername[username]}/>)
					}
					<AddNewGoal onClick={() => this.setState({isAddingGoal: true})}/>
					{this.renderAddGoalDialog()}
					{this.renderDeleteGoalDialog()}
				</div>
			</div>
		)
	}

	// goalHeader() {
	// 	return (
	// 		<div>
	// 			<GoalsTabs />
	// 			{ props.edit ? <Button secondary onClick={props.onClick}>{props.editable?"Edit":"Cancel"}</Button> : false }
	// 		</div>
	// 	)
	// }

	//<GoalHeader edit={goals.data.length > 0} timerange={timerange} editable={!this.props.goals.ui.isEditing} onClick={this.toggleEditing.bind(this)}/>

	// toggleEditing() {
	// 	this.props.dispatch(actions.toggleEditing(this.props.timerange))
	// }

	renderBottomBar(completed, total) {
		let k = <span>You've reached <span>{completed}</span>{` of ${total} ${pluralize(total, 'goal')}.`}</span>
		if (total === 0) {
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
		if (this.state.isAddingGoal) {
			const defaultTimerange = this.props.weeklyIsActive ? types.WEEKLY : types.MONTHLY
			return <AddGoalDialog
				onToggle={() => this.setState({ isAddingGoal: false })}
				defaultTimerange={defaultTimerange}
			/>
		}
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

	renderLoadingGoals() {
		return (<div className="goals">
			<div className="content">
				<GoalsTabs />
				<Loading />
			</div>
		</div>)
	}

}

const mapStateToProps = (state, props) => {
	let goals = state.monthlyGoals
	if (state.weeklyGoals.ui.active) {
		goals = state.weeklyGoals
	}

  return {
  	goals: goals,
    users: state.users,
	  weeklyIsActive: state.weeklyGoals.ui.active
  }
}

const connectedGoals = connect(mapStateToProps)(Goals)

export default connectedGoals
