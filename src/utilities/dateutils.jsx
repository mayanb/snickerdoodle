import moment from 'moment'

export function dateToUTCString(dateString, addOne) {
	var m = moment(dateString + " 00:00:00")

	if (addOne) {
		m.add(24, "hours")
	}

	return toUTCString(m)
}

export function toUTCString(momentDate) {
	return momentDate.utc().format('YYYY-MM-DD-HH-mm-ss-SSSSSS')
}

export function compareDates(date1, date2) {
	const format = 'YYYY-MM-DD'
	return date1.format(format) === date2.format(format)
}

export function getDateDisplay(value, teamTimeFormat) {
	const format = getTimeFormat(teamTimeFormat)
	return isValidISODate(value) ? moment(value).format(format) : value
}

export function getTimeFormat(teamTimeFormat) {
	const isNormal = teamTimeFormat === 'n'
	return isNormal ? 'MMMM DD, hh:mma' : 'MMMM DD, H:mm'
}

export function isValidISODate(dateString) {
	return moment(dateString, moment.ISO_8601, true).isValid()
}