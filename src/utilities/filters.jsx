export function processProductFilter(filter, option) {
	const p = option.props.data
	return `${p.code}${p.name}`.match(new RegExp(escapeRegExp(filter), 'i'))
}

export function formatOption(option) {
	return `${option.code} - ${option.name}`
}

// From https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
	//eslint-disable-next-line
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}