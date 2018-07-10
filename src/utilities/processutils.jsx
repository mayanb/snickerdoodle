export function processesHaveNoUserAttributes (processes) {
	return processes.length && (undefined === processes.find(process => {
		return process.attributes.find(attr => attr.datatype === 'USER') !== undefined
	}))
}

export function categoryName(category) {
	let category_name = "Work in Progress"
	if(category !== "wip") category_name = category === 'rm' ? "Raw Material" : "Finished Goods"
	return category_name
}

export function categoryColor(category) {
	let category_color = "#40B3FF"
	if(category !== "wip") category_color = category === 'rm' ? "#F2A51F" : "#5BD069"
	return category_color
}
