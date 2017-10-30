export function pluralize(number, noun) {
	if (number != 1) {
		return noun + 's'
	} else {
		return noun
	}
}