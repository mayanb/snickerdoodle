import api from '../WaffleconeAPI/api'

export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS"
export const REQUEST_LOGIN_FAILURE = "REQUEST_LOGIN_FAILURE"

export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
export const REQUEST_LOGOUT_SUCCESS = "REQUEST_LOGOUT_SUCCESS"
export const REQUEST_LOGOUT_FAILURE = "REQUEST_LOGOUT_FAILURE"

export const SWITCH_ACTIVE_USER = "SWITCH_ACTIVE_USER"
export const ADD_USER_ACCOUNT = "ADD_USER_ACCOUNT"

export function postRequestLogin(credentials, success, failure) {
	return function (dispatch) {
		dispatch(requestLogin())

		api.post('/auth/login/')
			.send(credentials)
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestLoginFailure(err))
					success()
				} else {
					dispatch(requestLoginSuccess(res.body))
					failure()
				}
			})
	}
}

function requestLogin() {
	return {
		type: REQUEST_LOGIN
	}
}

function requestLoginSuccess(response) {
	return {
		type: REQUEST_LOGIN_SUCCESS,
		response: response
	}
}

function requestLoginFailure(err) {
	return {
		type: REQUEST_LOGIN_FAILURE,
		error: err
	}
}

export function postRequestLogout(user, success, failure) {
	return function (dispatch) {
		dispatch(requestLogout())

		api.post('/auth/logout/')
			.set({Authorization: 'JWT ' + user.token})
			.end(function (err, res) {
				if (err || !res.ok) {
					dispatch(requestLogoutFailure(err))
					success()
				} else {
					dispatch(requestLogoutSuccess(res.body))
					failure()
				}
			})
	}
}

function requestLogout() {
	return {
		type: REQUEST_LOGOUT
	}
}

function requestLogoutSuccess(response) {
	return {
		type: REQUEST_LOGOUT_SUCCESS,
		response: response
	}
}

function requestLogoutFailure(err) {
	return {
		type: REQUEST_LOGOUT_FAILURE,
		error: err
	}
}

export function switchActiveUser(id) {
	return {
		type: SWITCH_ACTIVE_USER,
		id: id
	}
}

export function addUserAccount() {
	return {
		type: ADD_USER_ACCOUNT
	}
}