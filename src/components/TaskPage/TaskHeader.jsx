import React from 'react'
import './styles/taskheader.css'
import { withRouter } from 'react-router'


class TaskHeader extends React.Component {
	render() {
		const { task, onToggleFlag, history } = this.props
		const { is_flagged, ancestor_is_flagged } = task
		const title = `Activity Log / ${task.display}`
		const onBack = () => history.push('/activity-log')

		return (
			<div className={'task-header ' + (is_flagged || ancestor_is_flagged ? 'flagged' : '')}>
				<div className="title">
					<i className="material-icons" onClick={onBack}>arrow_back</i>
					{title}
				</div>
				{ ancestor_is_flagged && <TaskAncestorFlagged /> }
				<button className="header-button" onClick={onToggleFlag}>
					{ is_flagged ? 'Remove flag' : 'Flag this task'}
				</button>
			</div>
		)
	}
}

function TaskAncestorFlagged(props) {
	return (
		<div className="task-ancestor-flag">
			<i className="material-icons">error</i>
			<span>This task has flagged ancestors.</span>
		</div>
	)
}

export default withRouter(TaskHeader)
