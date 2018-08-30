export function processesHaveNoUserAttributes(processes) {
	return processes.length && (undefined === processes.find(process => {
		return process.attributes.find(attr => attr.datatype === 'USER') !== undefined
	}))
}

export function updateRanksToMatchOrder(attributes) {
	attributes.forEach((attribute, index) => attribute.rank = index)
}
