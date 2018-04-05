import React from 'react'
import './styles/taskheader.css'
import { withRouter } from 'react-router'


class TaskHeader extends React.Component {
	render() {
		const { task, onToggleFlag, history } = this.props
		const isFlagged = task.is_flagged
		const title = `Activity Log / ${task.display}`
		const onBack = () => history.push('/activity-log')

		return (
			<div className={'task-header ' + (isFlagged ? 'flagged' : '')}>
				<div className="title">
					<i className="material-icons" onClick={onBack}>arrow_back</i>
					{title}
				</div>
				<button className="header-button" onClick={onToggleFlag}>
					{isFlagged ? 'Remove flag' : 'Flag this task'}
				</button>
			</div>
		)
	}
}

export default withRouter(TaskHeader)
