import request from 'superagent'
import { getCookie } from '../../csrf.jsx'
import Teams from '../Teams/Teams'
import get_active_user from '../teams.jsx'

//let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
//let host = 'https://41aty886e1.execute-api.us-west-1.amazonaws.com/production'
//let host = 'http://127.0.0.1:8000'
let host = 'http://localhost:8000'


function get(path) {
	let url = host + path
	if (path.startsWith('/ics')) {
		url = host + '/ics/v3' + path.substring(4) 
	}

	let team = 1
	try {	
		team = get_active_user().user.team
	} catch(e) {

	}

	return request
		.get(url)
		//.withCredentials()
		.query({team_created_by: team, team: team})
}

function post(path) {
	let url = host + path

	// let team = -1
	let token = ""
	let team = 1
	try {
		team = get_active_user().user.team

		// token = JSON.parse(window.localStorage.getItem(`users-${team}`)).data[team].token
	} catch(e) {
		
	}

	return request
	.post(url)
	.set('Content-Type', 'application/json')
	//.set('X-CSRFToken', getCookie('csrftoken'))
	//.withCredentials()
	.send({team: team, team_created_by: team})

}

function put(path) {
	let url = host + path

	// let team = -1
	let team = 1
	let token = ""

	try {
		team = get_active_user().user.team
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

