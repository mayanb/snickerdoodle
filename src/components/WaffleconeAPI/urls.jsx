export const PRODUCTION_BACKEND = 'https://41aty886e1.execute-api.us-west-1.amazonaws.com/production'
export const STAGING_BACKEND = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
export const LOCAL_BACKEND = 'http://127.0.0.1:8000'

export function latest(host, path) {
	let url = host + path
	if (path.startsWith('/ics')) {
		url = host + '/ics/v7' + path.substring(4) 
	}
	return url
}