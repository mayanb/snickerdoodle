import request from 'superagent'

//let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging/ics/users/'
let host = 'http://127.0.0.1:8000'

function get(path) {
	let url = host + path
	let team = window.localStorage.getItem("team") || "1"

	return request
		.get(url)
		.query({created_by: team})
}

function post(path) {
	let url = host + path
	let team = window.localStorage.getItem("team") || "1"

	return request
	.post(url)
	.send({team: team, created_by: team})

}

function del(path, id) {
	let url = host + path + id

	return request('DELETE', url)
}

export default {get, post}

