import React from 'react'
import AlertTasks from './AlertTasks'
import { pluralize } from '../../utilities/stringutils'

export default function AlertFlaggedTask(props) {
	let tasks = props.tasks
	if (!tasks || !tasks.length) {
		return null
	}

	const title = `You have ${tasks.length} recently flagged ${pluralize(tasks.length, 'task')}.`
	return (
		<AlertTasks
			title={title}
			tasks={tasks}
			negative
		/>
	)
}