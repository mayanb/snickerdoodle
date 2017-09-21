function all() {
	return JSON.parse(window.localStorage.getItem("auth"))
}

function save(auth_response) {
	let auth = JSON.parse(window.localStorage.getItem("auth")) || {}
	auth[auth_response.user.pk] = auth_response
	window.localStorage.setItem("auth", JSON.stringify(auth))
}

function setActive(id) {
	let auth = JSON.parse(window.localStorage.getItem("auth")) || {}
	auth.auth_active = id
	window.localStorage.setItem("auth", JSON.stringify(auth))
}

export default {all, save, setActive}

