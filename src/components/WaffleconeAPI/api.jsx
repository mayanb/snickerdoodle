import request from 'superagent'
import { getCookie } from '../../csrf.jsx'
import Teams from '../Teams/Teams'


let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
//let host = 'https://41aty886e1.execute-api.us-west-1.amazonaws.com/production'
//let host = 'http://127.0.0.1:8000'

function get_active_user() {
	let users = JSON.parse(window.localStorage.getItem('users-v4'))
	return users.data[users.ui.activeUser]
}



function get(path) {
	let url = host + path
	if (path.startsWith('/ics')) {
		url = host + '/ics/v4' + path.substring(4) 
	}

	let user = {team: 1, user_id: 1}
	try {
		user = get_active_user().user
	} catch(e) {

	}
	console.log(url)
	return request
		.get(url)
		//.withCredentials()
		.query({ team_created_by: user.team, team: user.team})
}

function post(path) {
	let url = host + path
	if (path.startsWith('/ics')) {
		url = host + '/ics/v4' + path.substring(4) 
	}

	let team = -1
	let token = ""
	let id = -1
	let profile_id = -1
	try {
		let user = get_active_user().user
		team = user.team
		id = user.user_id
		profile_id = user.profile_id
		token = JSON.parse(window.localStorage.getItem('users-v4')).data[team].token
	} catch(e) {
		
	}

	return request
		.post(url)
		.set('Content-Type', 'application/json')
		//.set('X-CSRFToken', getCookie('csrftoken'))
		//.withCredentials()
		.send({userprofile: profile_id, created_by: id, team: team, team_created_by: team})

}

function put(path) {
	let url = host + path
	if (path.startsWith('/ics')) {
		url = host + '/ics/v4' + path.substring(4) 
	}

	let team = -1
	let token = ""
	try {
		team = get_active_user().user.team
		token = JSON.parse(window.localStorage.getItem('users-v4')).data[team].token
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

export default {get_active_user, get, post, del, host, put}

