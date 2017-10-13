import request from 'superagent'
import { getCookie } from '../../csrf.jsx'
import Teams from '../Teams/Teams'

//let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
//let host = 'https://41aty886e1.execute-api.us-west-1.amazonaws.com/production'
//let host = 'http://127.0.0.1:8000'
 let host = 'http://localhost:8000'

function get(path) {
	let url = host + path

	let team = 1
	try {
		team = JSON.parse(window.localStorage.getItem('users')).ui.activeUser
	} catch(e) {

	}
	console.log(url)
	return request
		.get(url)
		//.withCredentials()
		.query({created_by: team, team: team})
}

function post(path) {
	let url = host + path

	let team = -1
	let token = ""
	try {
		team = JSON.parse(window.localStorage.getItem('users')).ui.activeUser
		token = JSON.parse(window.localStorage.getItem('users')).data[team].token
	} catch(e) {
		
	}

	return request
	.post(url)
	.set('Content-Type', 'application/json')
	//.set('X-CSRFToken', getCookie('csrftoken'))
	//.withCredentials()
	.send({team: team, created_by: team})

}

function put(path) {
	let url = host + path

	let team = -1
	let token = ""
	try {
		team = JSON.parse(window.localStorage.getItem('users')).ui.activeUser
		token = JSON.parse(window.localStorage.getItem('users')).data[team].token
	} catch(e) {
		
	}

	return request('PUT', url)
	.set('Content-Type', 'application/json')
	//.set('X-CSRFToken', getCookie('csrftoken'))
	//.withCredentials()
	//.send({team: team, created_by: team})

}

function del(path, id) {
	let url = host + path + id

	return request('DELETE', url)
		//.withCredentials()

}

export default {get, post, del, host, put}

