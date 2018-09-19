import React from 'react'
import { connect } from 'react-redux'
import './styles/taskheader.css'
import { withRouter } from 'react-router'
import TaskDialogSimple from '../TaskDialog/TaskDialogSimple'
import api from '../WaffleconeAPI/api'


class TaskHeader extends React.Component {
	render() {
		const { task, onToggleFlag, history } = this.props
		const { is_flagged, flagged_ancestors_id_string } = task
		const title = `Activity Log / ${task.display}`
		const onBack = () => history.push('/activity-log')

		return (
			<div className={'task-header ' + (is_flagged ? 'flagged ' : ' ') + (flagged_ancestors_id_string ? 'ancestor_is_flagged' : '')}>
				<div className="title">
					<i className="material-icons" onClick={onBack}>arrow_back</i>
					{title}
				</div>
				{ flagged_ancestors_id_string && <TaskAncestorFlagged flagged_ancestors_id_string={flagged_ancestors_id_string}/> }
				<button className="header-button" onClick={onToggleFlag}>
					{ is_flagged ? 'Remove flag' : 'Flag this task'}
				</button>
			</div>
		)
	}
}

class TaskAncestorFlagged extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dialog: false,
			flagged_tasks: [],
		}
		this.handleToggle = this.handleToggle.bind(this)
	}
	
	componentDidMount() {
		const { flagged_ancestors_id_string } = this.props
		const params = { flagged_ancestors_id_string: flagged_ancestors_id_string }
		
		// Rather than wait the potentially SUPER LONG time to retrieve all ancestors and filter for flagged ones
		// we instead use the delimited string of flagged task ids to retrieve flagged tasks separately and quickly.
		api.get('/ics/tasks/')
			.query(params)
			.then(res => this.setState({ flagged_tasks: res.body }))
			.catch(err => console.log(err))
	}

	handleToggle() {
		this.setState({ dialog: !this.state.dialog })
	}

	render() {
		const { flagged_tasks } = this.state

		return (
			<div className="task-ancestor-flag">
				{ this.state.dialog && <TaskDialogSimple header='Flagged ancestors' onToggle={this.handleToggle} tasks={flagged_tasks}/> }
				<i className="material-icons">error</i>
				<span>This task has flagged ancestors.&nbsp;<span className="flagged-ancestors-review" onClick={this.handleToggle}>Review them now.</span></span>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const ancestors = state.taskAncestors.data || []
	return {
		ancestors: ancestors,
		ancestorsUI: state.taskAncestors.ui,
	}
}

export default withRouter(connect(mapStateToProps)(TaskHeader))
