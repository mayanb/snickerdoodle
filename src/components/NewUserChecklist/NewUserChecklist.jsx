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
		let{ teams, tasks, teamsUI, tasksUI } = this.props
		if(teamsUI.isFetchingData || tasksUI.isFetchingData || !teams || !tasks) {
			//return loading
			return null
		} else {
			if(teams.processes && teams.processes.length > 0) {
				console.log("create process is done")
				if(teams.processes.filter(e => e.attributes.length > 0)) {
					console.log("create attributes is done")
				}
			}
			if(teams.products && teams.products.length > 0) {
				console.log("create products is done")
			}
			if(teams.users && teams.users.length > 1) {
				console.log("invite team is done")
			}
			if(tasks && tasks.length > 0) {
				console.log("create task is done")
			}
		}
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