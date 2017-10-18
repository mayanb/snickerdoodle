import React from 'react'
import { connect } from 'react-redux'
import * as actions from './GoalsActions'
import Goal from './Goal'
import AddGoalDialog from './AddGoalDialog'
import DeleteGoalDialog from './DeleteGoalDialog'
import Button from '../Card/Button'

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

		return (
		<div className="goals">
			{
				goals.data.map(function (goal, i) {
					return <Goal goal={goal} key={i} onDelete={() => this.handleDelete(goal, i)} />
				}, this)
			}
			{this.renderAddGoalDialog()}
			{this.renderDeleteGoalDialog()}
			<Button onClick={() => this.setState({isAddingGoal: true})}>Make a new goal</Button>
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