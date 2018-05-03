export function processProductFilter(option, filter) {
	return `${option.code}${option.name}`.match(new RegExp(filter, 'i'))
}
