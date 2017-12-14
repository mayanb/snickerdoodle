import React from 'react'
import {connect} from 'react-redux'
import * as actions from './AlertActions'
import AlertFlaggedTasks from './AlertFlaggedTasks'
import AlertMissedGoal from './AlertMissedGoal'
import AlertAnomalousInputs from './AlertAnomalousInputs'
import AlertUnflaggedTask from './AlertUnflaggedTask'
import AlertCompletedGoal from './AlertCompletedGoal'

class Alerts extends React.Component {

	componentDidMount() {
		let {users} = this.props
		let user = users.data[users.ui.activeUser].user

		this.props.dispatch(actions.fetchCompletedGoals(user.profile_id))
		this.props.dispatch(actions.fetchMissedGoals(user.profile_id))
		this.props.dispatch(actions.fetchFlaggedTasks())
		this.props.dispatch(actions.fetchAnomalousInputs())
	}

	render() {
		let { flagged_tasks, missed_goals, anomalies, completed_goals } = this.props
		return (
			<div className="alerts">
				<AlertFlaggedTasks tasks={flagged_tasks}/>
				{
					missed_goals.map(function (g, i) {
						return <AlertMissedGoal key={i} goal={g} />
					})
				}
				{
					completed_goals.map(function (g, i) {
						console.log('completed')
						console.log(g)
						return <AlertCompletedGoal key={i} goal={g} />
					})
				}
				<AlertAnomalousInputs anomalies={anomalies} />
				{/* <div className="alert empty-state">
					<span>You have no new alerts.</span>
				</div> */} {/* TODO: Add logic for empty state if no alerts */}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		users: state.users,
		flagged_tasks: state.alert_flagged_tasks.data,
		missed_goals: state.alert_missed_goals.data,
		anomalies: state.alert_anomalous_inputs.data,
		completed_goals: state.alert_completed_goals.data,
	}
}

export default connect(mapStateToProps)(Alerts)

