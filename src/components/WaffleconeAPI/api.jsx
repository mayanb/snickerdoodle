import request from 'superagent'
import { getCookie } from '../../csrf.jsx'
import Teams from '../Teams/Teams'

//let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging'
let host = 'http://localhost:8000'

function get(path) {
	let url = host + path
	let team = Teams.all().auth_active
	
	return request
		.get(url)
		//.withCredentials()
		.query({created_by: team, team: team})
}

function post(path) {
	let url = host + path
	let team = Teams.all().auth_active

	return request
	.post(url)
	.set('Content-Type', 'application/json')
	//.set('X-CSRFToken', getCookie('csrftoken'))
	//.withCredentials()
	.send({team: team, created_by: team})

}

function del(path, id) {
	let url = host + path + id

	return request('DELETE', url)
		//.withCredentials()

}

export default {get, post, del, host}

