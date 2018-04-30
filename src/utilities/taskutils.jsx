export function getTaskAmount(task) {
	if (!isNaN(parseFloat(task.cumulativeAmount))) {
		console.log('task, cumulative amount', task, task.cumulativeAmount)
		return task.cumulativeAmount
	}
	const amount = task.total_amount || (task.items && task.items.reduce((sum, item) => sum + Number(item.amount), 0))
	return isNaN(parseFloat(amount)) ? undefined : parseFloat(amount)
}