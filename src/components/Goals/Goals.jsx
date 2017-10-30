import React from 'react'
import { connect } from 'react-redux'
import * as actions from './GoalsActions'
import Goal from './Goal'
import AddGoalDialog from './AddGoalDialog'
import DeleteGoalDialog from './DeleteGoalDialog'
import Button from '../Card/Button'
import Card from '../Card/Card'
import GoalSection from './GoalSection'
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
				<GoalSection heading='Daily Goals' timerange='d' handleDelete={this.handleDelete} />
				<GoalSection heading='Weekly Goals' timerange='w' handleDelete={this.handleDelete} />
				<GoalSection heading='Monthly Goals' timerange='m' handleDelete={this.handleDelete} />
				{this.renderAddGoalDialog()}
				{this.renderDeleteGoalDialog()}
			</div>
			<div>{this.renderBottomBar(completed,goals.data.length)}</div>
			</div>
		)
	}

	renderGoalSection(heading, timerange) {
		let { goals } = this.props
		let sectionGoals = []
		goals.data.map(function (goal, i) {
			if(goal.timerange == timerange) {
				let g = <Goal goal={goal} key={i} onDelete={() => this.handleDelete(goal, i)} />
				sectionGoals.push(g)
			}
		}, this)

		if (sectionGoals.length == 0) {
			return null
		}

		console.log(sectionGoals)

		return (
			<div>
				<span className="card-header">{heading}</span>
				{ sectionGoals }
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