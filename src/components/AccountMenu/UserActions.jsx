import api from '../WaffleconeAPI/api'

export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS"
export const REQUEST_LOGIN_FAILURE = "REQUEST_LOGIN_FAILURE"

export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
export const REQUEST_LOGOUT_SUCCESS = "REQUEST_LOGOUT_SUCCESS"
export const REQUEST_LOGOUT_FAILURE = "REQUEST_LOGOUT_FAILURE"

export const SWITCH_ACTIVE_USER = "SWITCH_ACTIVE_USER"
export const ADD_USER_ACCOUNT = "ADD_USER_ACCOUNT"

export const SET_GOOGLE_AUTHENTICATION = "SET_GOOGLE_AUTHENTICATION"
export const SET_GOOGLE_EMAIL = "SET_GOOGLE_EMAIL"

export const REFRESH = "REFRESH"
export const REFRESH_SUCCESS = "REFRESH_SUCCESS"
export const REFRESH_FAILURE = "REFRESH_FAILURE"

export const REQUEST_UPDATE_SETTING = "REQUEST_UPDATE_SETTING"
export const REQUEST_UPDATE_SETTING_SUCCESS = "REQUEST_UPDATE_SETTING_SUCCESS"
export const REQUEST_UPDATE_SETTING_FAILURE = "REQUEST_UPDATE_SETTING_FAILURE"


export function postRequestLogin(credentials, success, failure) {
	return function (dispatch) {
		dispatch(requestLogin())

		return api.post('/auth/login/')
			.send(credentials)
			.then(res => {
				dispatch(requestLoginSuccess(res.body))
				success && success(res.body)
			})
			.catch(err => {
				dispatch(requestLoginFailure(err))
				throw err
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

export function setGoogleAuthentication(value) {
	return {
		type: SET_GOOGLE_AUTHENTICATION,
		value: value,
	}
}

export function setGoogleEmail(value) {
	return {
		type: SET_GOOGLE_EMAIL,
		value: value,
	}
}

export function requestRefreshUserAccount(id) {
	return function (dispatch) {
		dispatch(refreshUserAccount())

		api.get(`/ics/userprofiles/${id}/`)
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(err)
					dispatch(refreshUserAccountFailure(err))
				} else {
					dispatch(refreshUserAccountSuccess(res.body))
				}
			})
	}
}

function refreshUserAccount() {
	return {
		type: REFRESH,
	}
}

function refreshUserAccountSuccess(data) {
	return {
		type: REFRESH_SUCCESS,
		data: data,
	}
}

function refreshUserAccountFailure() {
	return {
		type: REFRESH_FAILURE,
	}
}


export function updateUserSetting(id, key, value) {
	return function (dispatch) {
		dispatch(requestUpdateUserSetting(key))

		api.patch(`/ics/userprofiles/edit/${id}/`)
			.send({[key]: value})
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(err)
					dispatch(updateUserSettingFailure())
				} else {
					dispatch(updateUserSettingSuccess(key, value))
				}
			})
	}
}


function requestUpdateUserSetting(key, value) {
	return {
		type: REQUEST_UPDATE_SETTING,
		key: key,
	}
}

function updateUserSettingSuccess(key, value) {
	return {
		type: REQUEST_UPDATE_SETTING_SUCCESS,
		key: key,
		value: value,
	}
}

function updateUserSettingFailure(key, value) {
	return {
		type: REQUEST_UPDATE_SETTING_FAILURE,
		key: key,
		value: value,
	}
}