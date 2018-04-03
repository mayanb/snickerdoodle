import React from 'react'
import { connect } from 'react-redux'
import * as actions from './NewUserChecklistActions.jsx'

export default function NewUserChecklist(props) {
	constructor(props) {
		super(props)
		this.state = {

		}

	}
	componentDidMount() {
		this.props.dispatch(actions.fetchTeams())
		this.props.dispatch(actions.fetchTasks())
	}

	return (
		let{ teams, tasks} = this.state
		console.log(teams)
		console.log(tasks)
		<div />
	)
}

const mapStateToProps = (state/*, props*/) => {
	return {
		teams: state.teams.data,
		teamsUI: state.teams.ui,
		tasks: state.tasks.data,
		tasksUI: state.tasks.data,
	}
}

const connectedNewUserChecklist = connect(mapStateToProps)(NewUserChecklist)

export default connectedNewUserChecklist