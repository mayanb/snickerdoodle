import update from 'immutability-helper'
import {
	REQUEST_LOGIN,
	REQUEST_LOGIN_SUCCESS,
	REQUEST_LOGIN_FAILURE,

	REQUEST_LOGOUT,
	REQUEST_LOGOUT_SUCCESS,
	REQUEST_LOGOUT_FAILURE,
	SWITCH_ACTIVE_USER, 
	ADD_USER_ACCOUNT,
	SET_GOOGLE_AUTHENTICATION,
	SET_GOOGLE_EMAIL,
} from './UserActions'

function getDefaultState() {
	// get the state from local storage 
	let state = JSON.parse(window.localStorage.getItem('users-v4'))

	// if there was nothing in local storage, fill it with default 
	if (!state) {
		return {
		  data: {},
		  ui: {
		  	isLoggingIn: false,
		  	isLoggingOut: false,
		  	activeUser: -1,
		  	isAddingAccount: false
		  }
		}
	}

	return state
}

export default function _users(state = getDefaultState(), action) {
    switch (action.type) {
    	case REQUEST_LOGIN:
      		return requestLogin(state, action)
	    case REQUEST_LOGIN_SUCCESS:
	    		return requestLoginSuccess(state, action)
	    case REQUEST_LOGIN_FAILURE:
	    		return requestLogoutFailure(state, action)
	    case REQUEST_LOGOUT:
	    		return requestLogout(state, action)
	    case REQUEST_LOGOUT_SUCCESS:
	    		return requestLogoutSuccess(state, action)
	    case REQUEST_LOGOUT_FAILURE:
	    		return requestLogoutFailure(state, action)
	    case SWITCH_ACTIVE_USER:
	    		return switchActiveUser(state, action)
	    case ADD_USER_ACCOUNT:
	    		return addUserAccount(state, action)
	    case SET_GOOGLE_AUTHENTICATION:
	    		return setGoogleAuthentication(state, action)
	    case SET_GOOGLE_EMAIL:
	    		return setGoogleEmail(state, action)
	    default:
	      return state
  	}
}

function setGoogleAuthentication(state, action) {
	let ns = update(state, {
		data: {
			[state.ui.activeUser]: {
				user: {	
					$merge: { has_gauth_token: action.value }
				}
			}
		}
	})
	window.localStorage.setItem('users-v4', JSON.stringify(ns))
	return ns
}

function setGoogleEmail(state, action) {
	let ns = update(state, {
		data: {
			[state.ui.activeUser]: {
				user: {	
					$merge: { gauth_email: action.value }
				}
			}
		}
	})
	window.localStorage.setItem('users-v4', JSON.stringify(ns))
	return ns
}

function requestLogin(state, action) {
	return update(state, {
		ui: {
			isLoggingIn: {
				$set: true
			}
		}
	})
}

function requestLoginSuccess(state, action) {
	let newState = update(state, {
		data: {
			$merge: {
				[action.response.user.profile_id]: action.response
			}
		}, 
		ui: {
			$merge: {
				isLoggingIn: false,
				activeUser: action.response.user.profile_id,
				isAddingAccount: false,
			}
		}
	})

	window.localStorage.setItem('users-v4', JSON.stringify(newState))
	return newState
}

function requestLoginFailure(state, action) {
	alert("something went wrong!")
	return update(state, {
		ui : {
			isLoggingIn: {
				$set: false
			}
		}
	})
}

function requestLogout(state, action) {
		return update(state, {
		isLoggingOut: {
			$set: true
		}
	})
}

function requestLogoutSuccess(state, action) {
	let newState = update(state, {
		data: {
			$unset: [action.id]
		}, 
		ui: {
			$merge: {
				isLoggingOut: false,
				activeUser: -1,
			}
		}
	})

	window.localStorage.setItem('users-v4', JSON.stringify(newState))
	return newState
}

function requestLogoutFailure(state, action) {
	alert("something went wrong!")
	return update(state, {
		ui: {
			isLoggingOut: {
				$set: false
			}
		}
	})
}

function switchActiveUser(state, action) {
	let newState = update(state, {
		ui: {
			$merge: {activeUser: action.id}
		}
	})
	window.localStorage.setItem('users-v4', JSON.stringify(newState))
	return newState
}

function addUserAccount(state, action) {
	let ns =  update(state, {
		ui: {
			$merge: {isAddingAccount: true}
		}
	})
	console.log(ns)
	return ns
}