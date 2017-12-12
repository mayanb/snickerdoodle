import React from 'react'
import {connect} from 'react-redux'
import * as actions from './AlertActions'
import AlertFlaggedTasks from './AlertFlaggedTasks'
import AlertMissedGoal from './AlertMissedGoal'

class Alerts extends React.Component {

	componentDidMount() {
		this.props.dispatch(actions.fetchFlaggedTasks())
		this.props.dispatch(actions.fetchMissedGoals())
		this.props.dispatch(actions.fetchAnomalousInputs())
	}

	render() {
		let {flagged_tasks, missed_goals } = this.props
		return (
			<div className="alerts">
				<AlertFlaggedTasks tasks={flagged_tasks}/>
				{
					missed_goals.map(function (g, i) {
						return <AlertMissedGoal key={i} goal={g} />
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		flagged_tasks: state.alert_flagged_tasks.data,
		missed_goals: state.alert_missed_goals.data
	}
}

export default connect(mapStateToProps)(Alerts)

