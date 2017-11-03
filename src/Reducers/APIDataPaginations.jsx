export function isPaginated(data) {
	return data.results
}

export function list(data) {
	if (isPaginated(data)) {
		return data.results
	} else return data
}

export function hasNext(data) {
	return data.next
}

export function next(data) {
	if (isPaginated(data) && hasNext(data)) {
		return data.next.split('?')[1]
	} else return null
}

function extractUrlValue(key, url) {
    if (typeof(url) === 'undefined')
        url = window.location.href;
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}