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
