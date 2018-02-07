import React from 'react'
import {connect} from 'react-redux'
import * as actions from './AlertActions'
import AlertFlaggedTasks from './AlertFlaggedTasks'
import AlertAnomalousInputs from './AlertAnomalousInputs'
import AlertCompletedGoals from './AlertCompletedGoals'
import './styles/alerts.css'

function getLatest(arr, type) {
	let latest = null
	arr.map((e, i) => {
		if (e.alert_type === type) {
			if (!latest || latest.created_at < e.created_at)
				latest = e
		}
	})
	return latest
}

class Alerts extends React.Component {

	componentDidMount() {
		let {users} = this.props
		let user = users.data[users.ui.activeUser].user

		// this.props.dispatch(actions.fetchCompletedGoals(user.profile_id))
		// this.props.dispatch(actions.fetchMissedGoals(user.profile_id))
		// this.props.dispatch(actions.fetchFlaggedTasks())
		// this.props.dispatch(actions.fetchAnomalousInputs())
		this.props.dispatch(actions.fetchAlerts(user.profile_id))
	}

	// render() {
	// 	let {flagged_tasks, missed_goals, anomalies, completed_goals, } = this.props
	// 	return (
	// 		<div className="alerts">
	// 			<AlertFlaggedTasks tasks={flagged_tasks}/>
	// 			{
	// 				missed_goals.map(function (g, i) {
	// 					return <AlertMissedGoal key={i} goal={g} />
	// 				})
	// 			}
	// 			{
	// 				completed_goals.map(function (g, i) {
	// 					console.log('completed')
	// 					console.log(g)
	// 					return <AlertCompletedGoal key={i} goal={g} />
	// 				})
	// 			}
	// 			<AlertAnomalousInputs anomalies={anomalies} />
	// 		</div>
	// 	)
	// }
	render() {
		let {alerts } = this.props
		var flagged_tasks = getLatest(alerts, 'ft')
		var unflagged_tasks = getLatest(alerts, 'ut')
		var missed_goals = getLatest(alerts, 'ig')
		var completed_goals = getLatest(alerts, 'cg')
		var anomalies = getLatest(alerts, 'ai')

		// var unflagged_tasks = getLatest(alerts.filter(e => e.alert_type == 'ut'))
		// var missed_goals = alerts.filter(e => e.alert_type == 'ig')
		// var completed_goals = alerts.filter(e => e.alert_type == 'cg')
		// var anomalies = alerts.filter(e => e.alert_type == 'ai')

		return (
			<div className="alerts">
				<AlertCompletedGoals isCompleted={true} goals={completed_goals} />
				<AlertFlaggedTasks isFlagging={true} tasks={flagged_tasks}/>
				<AlertFlaggedTasks isFlagging={false} tasks={unflagged_tasks}/>
				<AlertAnomalousInputs anomalies={anomalies} />
				<AlertCompletedGoals isCompleted={false} goals={missed_goals} />
			</div>
		)
	}

}

const mapStateToProps = (state, props) => {
	return {
		users: state.users,
		alerts: state.alerts.data
	}
}

export default connect(mapStateToProps)(Alerts)

