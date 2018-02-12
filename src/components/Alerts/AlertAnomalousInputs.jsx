import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import AlertTasks from './AlertTasks'

export default class AlertAnomalousInputs extends React.Component {
	render() {
		let { tasks } = this.props

		if (!tasks || !tasks.length) {
			return null
		}

		// filter for unique tasks
		const task_ids = {}
		tasks = tasks.filter(function (t) {
			if (task_ids[t.task]) {
				return false
			} 
			task_ids[t.task] = t
			return true
		})

		let title = `There are ${tasks.length} ${pluralize(tasks.length, 'task')} that have unlikely inputs. Check in to make sure everything's okay.`
		return (
			<AlertTasks
				title={title}
				tasks={tasks}
				negative
			/>
		)
	}
}

