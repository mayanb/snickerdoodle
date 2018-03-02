import React from 'react'
import { connect } from 'react-redux'
import Button from '../Card/Button'
import Img from '../Img/Img'
import * as actions from './AlertActions'
import AlertFlaggedTask from './AlertFlaggedTask'
import AlertUnflaggedTask from './AlertUnflaggedTask'
import AlertAnomalousInputs from './AlertAnomalousInputs'
import AlertCompletedGoals from './AlertCompletedGoals'
import Loading from '../Loading/Loading'
import { toArray } from '../../utilities/arrayutils'
import './styles/alerts.css'

class Alerts extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			expanded: false
		}
		this.handleToggleAlerts = this.handleToggleAlerts.bind(this)
	}

	componentDidMount() {
		let { users } = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchAlerts(user.profile_id))
	}

	render() {
		let { flaggedTasks, unflaggedTasks, completedGoals, missedGoals, anomalies, anyAlerts } = this.props

		return (
			<div className={`dropdown ${this.state.expanded && 'expanded'}`}>
				<Button link onClick={this.handleToggleAlerts}>
					{DropdownIcon({anyAlerts: anyAlerts})}
				</Button>
				<div className="card nopadding dropdown-content">
					<div className="alerts">
						<Loading isFetchingData={this.props.isFetchingData}>
							<AlertCompletedGoals isCompleted={true} goals={completedGoals} />
							<AlertFlaggedTask tasks={flaggedTasks} />
							<AlertUnflaggedTask tasks={unflaggedTasks} />
							<AlertAnomalousInputs tasks={anomalies} />
							<AlertCompletedGoals isCompleted={false} goals={missedGoals} />
						</Loading>
					</div>
				</div>
			</div>
		)
	}

	handleToggleAlerts() {
		this.setState({expanded: !this.state.expanded})
	}
}

function DropdownIcon({anyAlerts}) {
	const src = anyAlerts ? 'yesalerts@2x' : 'noalerts@2x'
	return <Img src={src} height="24px" className="alerts" />
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
		anyAlerts: !!alerts.length,
		isFetchingData: state.users.ui.isFetchingData || state.alerts.ui.isFetchingData,
		flaggedTasks: getLatest(alerts, 'ft'),
		unflaggedTasks: getLatest(alerts, 'ut'),
		missedGoals: getLatest(alerts, 'ig'),
		completedGoals: getLatest(alerts, 'cg'),
		anomalies: inputsToFauxTasks(getLatest(alerts, 'ai'))
	}
}

export default connect(mapStateToProps)(Alerts)

