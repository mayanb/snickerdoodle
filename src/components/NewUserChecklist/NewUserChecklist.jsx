import React from 'react'
import { connect } from 'react-redux'
import * as actions from './NewUserChecklistActions.jsx'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'

class NewUserChecklist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}

	}
	componentDidMount() {
		console.log("fetching")
		this.props.dispatch(actions.fetchTeams())
		this.props.dispatch(actions.fetchTasks())
	}

	render() { 
		let{ teams, tasks} = this.props
		console.log(teams)
		console.log(tasks)
		return (
			<div>
				<ApplicationSectionHeader>Onboard your factory</ApplicationSectionHeader>
			</div>
		)	
	}
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