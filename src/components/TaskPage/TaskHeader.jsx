import React from 'react'
import { connect } from 'react-redux'
import './styles/taskheader.css'
import { withRouter } from 'react-router'
import TaskDialogSimple from '../TaskDialog/TaskDialogSimple'


class TaskHeader extends React.Component {
	render() {
		const { task, onToggleFlag, history } = this.props
		const { is_flagged, num_flagged_ancestors } = task
		const title = `Activity Log / ${task.display}`
		const flagged_ancestors = (this.props.ancestors || []).filter(e => e.is_flagged)
		const onBack = () => history.push('/activity-log')

		return (
			<div className={'task-header ' + (is_flagged ? 'flagged ' : ' ') + (num_flagged_ancestors !== 0 ? 'ancestor_is_flagged' : '')}>
				<div className="title">
					<i className="material-icons" onClick={onBack}>arrow_back</i>
					{title}
				</div>
				{ num_flagged_ancestors !== 0 && <TaskAncestorFlagged tasks={flagged_ancestors}/> }
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
		}
		this.handleToggle = this.handleToggle.bind(this)
	}

	handleToggle() {
		this.setState({ dialog: !this.state.dialog })
	}

	render() {
		return (
			<div className="task-ancestor-flag">
				{ this.state.dialog && <TaskDialogSimple header='Flagged ancestors' onToggle={this.handleToggle} tasks={this.props.tasks}/> }
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
