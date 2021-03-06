import React from 'react'
import AlertTasks from './AlertTasks'
import { pluralize } from '../../utilities/stringutils'

export default function AlertUnflaggedTask(props) {
	let tasks = props.tasks
	if (!tasks || !tasks.length) {
		return null
	}

	const title = `You recently unflagged ${tasks.length} ${pluralize(tasks.length, 'task')}.`
	return (
		<AlertTasks
			title={title}
			tasks={tasks}
			positive
		/>
	)
}
