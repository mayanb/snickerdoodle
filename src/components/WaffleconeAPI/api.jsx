import request from 'superagent'
import * as urls from './urls'

let host = urls.getBackend()

function get_active_user() {
	let users = JSON.parse(window.localStorage.getItem('users-v5'))
	return users.data[users.ui.activeUser]
}

function get(path) {
	let url = path.startsWith('http')?path:urls.latest(host, path)
	let user = {team: 1, user_id: 1}
	try {
		user = get_active_user().user
	} catch(e) {

	}
	return request
		.get(url)
		//.withCredentials()
		.query({ team_created_by: user.team, team: user.team})
}

function post(path) {
	let url = urls.latest(host, path)
	let team = -1
	//let token = ""
	let id = -1
	let profile_id = -1
	try {
		let user = get_active_user().user
		team = user.team
		id = user.user_id
		profile_id = user.profile_id
		//token = JSON.parse(window.localStorage.getItem('users-v5')).data[team].token
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
	let url = urls.latest(host, path)
	//let team = -1
	//let token = ""
	try {
		//team = get_active_user().user.team
		//token = JSON.parse(window.localStorage.getItem('users-v5')).data[team].token
	} catch(e) {}

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

function patch(path) {
	let url = urls.latest(host, path)
	let team = -1
	let id = -1
	let profile_id = -1
	try {
		let user = get_active_user().user
		team = user.team
		id = user.user_id
		profile_id = user.profile_id
	} catch(e) {
		
	}

	return request
		.patch(url)
		.set('Content-Type', 'application/json')
		.send({userprofile: profile_id, created_by: id, team: team, team_created_by: team})
}
export default {get_active_user, get, post, del, host, put, patch}

