import React from 'react'
import TaskInputTable from './TaskInputTable'
import TaskOutputTable from './TaskOutputTable'
import { connect } from 'react-redux'
import './styles/taskinputsandoutputs.css'
import { isDandelion } from '../../utilities/userutils'

class TaskInputsAndOutputs extends React.Component {

	render() {
		const { data } = this.props
		return (
			<div className="task-inputs-and-outputs">
				{!!data.inputs.length && <TaskInputTable data={data}/>}
				{this.teamUsesOutputs() && !!data.items.length && <TaskOutputTable outputs={data.items} />}
			</div>
		)
	}

	// TEMP: For optional printing transition, to allow Dandelion to continue using outputs
	teamUsesOutputs() {
		const { data, ui } = this.props.users
		const team = data[ui.activeUser].user.team_name
		return isDandelion(team)
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
