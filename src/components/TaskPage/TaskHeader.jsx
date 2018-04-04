import React from 'react'
import './styles/taskheader.css'


export default class TaskHeader extends React.Component {
	render() {
		const { task, onToggleFlag } = this.props
		const isFlagged = task.is_flagged
		const title = `Activity Log / ${task.label}`

		return (
			<div className={'task-header ' + (isFlagged ? 'flagged': '')}>
				{title}
				<button className="header-button" onClick={onToggleFlag}>
					{isFlagged ? 'Remove flag' : 'Flag this task'}
				</button>
			</div>
		)
	}
}
