export function toArray(obj) {
	if (!obj) 
		return []
	if (!Array.isArray(obj))
		return [obj]
	return obj
}

export function findPosition(array, item, comparator) {
	if (!comparator)
		return array.length
	return positionHelper(array, item, comparator, 0, array.length - 1)
}

function positionHelper(array, item, comparator, start, end) {

	// base case
	if (end <= start) {
	return start
	}

	let center = Math.trunc((start + end)/2)
	let result = comparator(item, array[center])

	if (result === -1) 
	return positionHelper(array, item, comparator, start, center - 1)

	if (result === 1) 
	return positionHelper(array, item, comparator, center+1, end)

	if (result === 0)
	return center

}

export function alphabetize(a, b) {
  if (a === b || a===null || b===null) 
    return 0

  let aName = a.code.toUpperCase()
  let bName = b.code.toUpperCase()

  if (aName < bName) 
    return -1
  if (aName > bName)
    return 1

  return 0
}

export function sortByAccountType(a, b) {
	if (a === b || !a || !b) {
		return 0
	}

	if (a.account_type < b.account_type) {
		return -1
	}
	if (a.account_type > b.account_type) {
		return 1
	}
	return 0
}

export function sortByRank(a, b) {
	if (a === b || !a || !b) {
		return 0
	}

	return parseInt(a.rank, 10) - parseInt(b.rank, 10)
}

export function consolidateInputsFromSameTask(tasks) {
	console.log('tasks pre-filter:', tasks)
	const taskIDDict = {}
	tasks.forEach(task => {
		const amount = task.total_amount || (task.items && task.items.reduce((sum, item) => sum + Number(item.amount), 0))
		const existingTask = taskIDDict[task.id]
		if (amount) { // add or increment
			if (existingTask) {
				alert('DUPLICATE! task, existingTask: ', task, existingTask)
				console.log('DUPLICATE! task, existingTask: ', task, existingTask)
				existingTask.product_history_consolidated_amount += parseFloat(amount)
			} else {
				task.product_history_consolidated_amount = parseFloat(amount)
				taskIDDict[task.id] = task
			}
		} else { // amount undefined, so no need to track or increment
			taskIDDict[task.id] = task
		}
	})
	console.log('tasks  POST-FILTER:', Object.values(taskIDDict))
	return Object.values(taskIDDict)
}