import React from 'react'
import { connect } from 'react-redux'
import * as actions from './GoalsActions'
import Goal from './Goal'
import AddGoalDialog from './AddGoalDialog'
import DeleteGoalDialog from './DeleteGoalDialog'
import Button from '../Card/Button'
import Card from '../Card/Card'
import { pluralize } from '../Logic/stringutils'

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
		let {users, goals} = this.props
		if (!goals) 
			return false

		let completed = 0
		goals.data.map(function (goal, i) {
			if (goal.actual >= goal.goal)
				completed += 1
		})

		return (
			<div className="goals">
			<div className="content">
				<span className="card-header">Weekly Goals</span>
				{
					goals.data.map(function (goal, i) {
						return <Goal goal={goal} key={i} onDelete={() => this.handleDelete(goal, i)} />
					}, this)
				}
				{this.renderAddGoalDialog()}
				{this.renderDeleteGoalDialog()}
			</div>
			<div>{this.renderBottomBar(completed,goals.data.length)}</div>
			</div>
		)
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

	handleDelete(goal, i) {
		console.log("in handleDelete")
		console.log(goal)
		this.setState({isDeletingGoal: goal, isDeletingGoalIndex: i})
	}

	renderAddGoalDialog() {
		if (this.state.isAddingGoal)
			return <AddGoalDialog onToggle={() => this.setState({isAddingGoal: false})} />
		return null
	}

	renderDeleteGoalDialog() {
		console.log("inrenderdeletegoaldialog")
		console.log(this.state.isDeletingGoal)
		if (this.state.isDeletingGoal)
			return <DeleteGoalDialog goal={this.state.isDeletingGoal} index={this.state.isDeletingGoalIndex} onToggle={() => this.setState({isDeletingGoal: null})} />
		return null
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    goals: state.goals,
    users: state.users
  }
}

const connectedGoals = connect(mapStateToProps)(Goals)

export default connectedGoals