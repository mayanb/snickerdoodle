import React from 'react'
import './styles/task.css'
import TaskInputTable from './TaskInputTable'
import TaskOutputTable from './TaskOutputTable'
import { connect } from 'react-redux'
import './styles/taskinputsandoutputs.css'

class TaskInputsAndOutputs extends React.Component {

	render() {
		const { data } = this.props
		return (
			<div className="task-inputs-and-outputs">
				<TaskInputTable data={data}/>
				{this.teamUsesOutputs() && <TaskOutputTable outputs={data.items} />}
			</div>
		)
	}

	// TEMP: For optional printing transition, to allow Dandelion to continue using outputs
	teamUsesOutputs() {
		const { data, ui } = this.props.users
		const teamID = parseInt(data[ui.activeUser].user.team, 10)
		const teamIDsWhoUseOutputs = new Set([1 /* -> Alabama */, 2  /* -> Valencia */])
		return teamIDsWhoUseOutputs.has(teamID)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		users: state.users,
		data: state.task.data,
		ui: state.task.ui,
	}
}
export default connect(mapStateToProps)(TaskInputsAndOutputs)
