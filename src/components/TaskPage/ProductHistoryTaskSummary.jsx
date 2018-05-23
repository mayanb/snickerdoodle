import React from 'react'
import { formatAmount, getProcessIcon } from '../../utilities/stringutils'
import Img from '../Img/Img'

export default function TaskSummary({ task, selected, onClick }) {
	const amount = task.total_amount || (task.items && task.items.reduce((sum, item) => sum + Number(item.amount), 0))
	const formattedAmount = amount ? formatAmount(amount, task.process_type.unit) : '(Unknown Amount)'
	const is_ancestor_flagged = !task.is_flagged && task.num_flagged_ancestors > 0
	return (
		<div
			className={'task-summary ' + (selected ? 'selected' : '')}
			onClick={() => followLink(onClick, task)}
		>
			<div className="task-icon">
				{task.process_type.icon && <Img src={getProcessIcon(task.process_type.icon)}/>}
			</div>
			<div className="task-text">
				<div className={"task-name " + (task.is_flagged && "task-flagged-name ") + (is_ancestor_flagged && " task-ancestor-flagged-name")}>
					{task.is_flagged && <i className= "task-flagged material-icons">error</i>}
					{is_ancestor_flagged && <i className= "task-ancestor-flagged material-icons">error</i>}
					{task.display}
				</div>
				<div className="task-amount">
					{formattedAmount}
				</div>
			</div>
			<i className="material-icons expand-i">open_in_new</i>
		</div>
	)
}

function followLink(onClick, task) {
	if (onClick) {
		onClick()
	}
	else {
		window.open(`${window.location.origin}/task/${task.id}`, '_blank')
	}
}