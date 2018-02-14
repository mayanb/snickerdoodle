import moment from 'moment'

export function toUTCString(dateString, addOne) {
	var m = moment(dateString + " 00:00:00")

	if (addOne) {
		m.add(24, "hours")
	}

	return m.utc().format('YYYY-MM-DD-HH-mm-ss-SSSSSS')
}
