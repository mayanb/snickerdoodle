import React from 'react'
import { connect } from 'react-redux'
import * as actions from './AlertActions'
import AlertFlaggedTask from './AlertFlaggedTask'
import AlertUnflaggedTask from './AlertUnflaggedTask'
import AlertAnomalousInputs from './AlertAnomalousInputs'
import AlertCompletedGoals from './AlertCompletedGoals'
import Loading from '../Loading/Loading'
import { toArray } from '../../utilities/arrayutils'
import './styles/alerts.css'

class Alerts extends React.Component {

	componentDidMount() {
		let { users } = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchAlerts(user.profile_id))
	}

	render() {
		let { flaggedTasks, unflaggedTasks, completedGoals, missedGoals, anomalies } = this.props

		return (
			<div className="alerts">
				<Loading isFetchingData={this.props.isFetchingData}>
					<AlertCompletedGoals isCompleted={true} goals={completedGoals} />
					<AlertFlaggedTask tasks={flaggedTasks}/>
					<AlertUnflaggedTask tasks={unflaggedTasks} />
					<AlertAnomalousInputs tasks={anomalies} />
					<AlertCompletedGoals isCompleted={false} goals={missedGoals} />
				</Loading>
			</div>
		)
	}
}

function getLatest(arr, type) {
	let latest = null
	arr.forEach((e, i) => {
		if (e.alert_type === type) {
			if (!latest || latest.created_at < e.created_at)
				latest = e
		}
	})
	return parseVariableContent(latest)
}

function parseVariableContent(alert) {
	if(alert)
		return toArray(JSON.parse(alert.variable_content))
}

function inputsToFauxTasks(inputs) {
	if(!inputs) return null

	return inputs.map(input => ({
		id: input.input_task_n.id,
		display: input.input_task_n.display,
		created_at: input.input_task_n.created_at,
		process_type: {
			name: input.input_task_process_name,
			icon: input.input_task_process_icon
		},
		product_type: {
			name: input.input_task_product_name
		}
	}))
}

const mapStateToProps = (state, rops) => {
	let alerts = state.alerts.data

	return {
		users: state.users,
		isFetchingData: state.users.ui.isFetchingData || state.alerts.ui.isFetchingData,
		flaggedTasks: getLatest(alerts, 'ft'),
		unflaggedTasks: getLatest(alerts, 'ut'),
		missedGoals: getLatest(alerts, 'ig'),
		completedGoals: getLatest(alerts, 'cg'),
		anomalies: inputsToFauxTasks(getLatest(alerts, 'ai'))
	}
}

export default connect(mapStateToProps)(Alerts)

