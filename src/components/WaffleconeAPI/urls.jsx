export function getBackend() {
	switch(process.env.REACT_APP_BACKEND) {
		case 'production':
			return 'https://41aty886e1.execute-api.us-west-1.amazonaws.com/production'
		case 'staging':
			return 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
		default:
			return 'http://127.0.0.1:8000'
	}
}

export function latest(host, path) {
	let url = host + path
	if (path.startsWith('/ics')) {
		url = host + '/ics/v8' + path.substring(4) 
	}
	return url
}