export function processProductFilter(option, filter) {
	return `${option.code}${option.name}`.match(new RegExp(escapeRegExp(filter), 'i'))
}

// From https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}