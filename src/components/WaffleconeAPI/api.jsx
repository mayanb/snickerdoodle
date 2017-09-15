import request from 'superagent'
import { getCookie } from '../../csrf.jsx'

let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
//let host = 'http://127.0.0.1:8000'

function get(path) {
	let url = host + path
	let team = window.localStorage.getItem("team") || "1"

	return request
		.get(url)
		//.withCredentials()
		.query({created_by: team})
}

function post(path) {
	let url = host + path
	let team = window.localStorage.getItem("team") || "1"

	return request
	.post(url)
	.set('Content-Type', 'application/json')
	.set('X-CSRFToken', getCookie('csrftoken'))
	//.withCredentials()
	.send({team: team, created_by: team})

}

function del(path, id) {
	let url = host + path + id

	return request('DELETE', url)
		.withCredentials()

}

export default {get, post}

