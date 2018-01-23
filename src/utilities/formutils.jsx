export function validateForm(data) {
	let keys = Object.keys(data)
	let v = true
	keys.forEach((k) => {
		if (k !== 'valid' && !data[k].trim().length) 
			v = false
	})
	return v
}