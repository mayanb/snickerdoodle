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

	REFRESH,
	REFRESH_SUCCESS,
	REFRESH_FAILURE,

	REQUEST_UPDATE_SETTING,
	REQUEST_UPDATE_SETTING_SUCCESS,
	REQUEST_UPDATE_SETTING_FAILURE,

} from '../components/AccountMenu/UserActions'

function getDefaultState() {
	// get the state from local storage 
	let state = JSON.parse(window.localStorage.getItem('users-v5'))

	// if there was nothing in local storage, fill it with default 
	if (!state) {
		return {
		  data: {},
		  ui: {
		  	isLoggingIn: false,
		  	isLoggingOut: false,
		  	activeUser: -1,
		  	isAddingAccount: false,
		  	isUpdatingSetting: null,
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
	    		return requestLoginFailure(state, action)
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
	    case REFRESH:
	    		return refresh(state, action)
	    case REFRESH_SUCCESS:
	    		return refreshSuccess(state, action)
	    case REFRESH_FAILURE:
	    		return refreshFailure(state, action)
	    case REQUEST_UPDATE_SETTING:
	    		return updateSetting(state, action)
	    case REQUEST_UPDATE_SETTING_SUCCESS:
	    		return updateSettingSuccess(state, action)
	    case REQUEST_UPDATE_SETTING_FAILURE:
	    		return udpateSettingFailure(state, action)
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
	window.localStorage.setItem('users-v5', JSON.stringify(ns))
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
	window.localStorage.setItem('users-v5', JSON.stringify(ns))
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
	let newState;
	newState = update(state, {
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
	});

	window.localStorage.setItem('users-v5', JSON.stringify(newState))
	return newState
}

function requestLoginFailure(state, action) {
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
				isUpdatingSetting: null,
			}
		}
	})

	window.localStorage.setItem('users-v5', JSON.stringify(newState))
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
			$merge: {activeUser: action.id, isUpdatingSetting: null}
		}
	})
	window.localStorage.setItem('users-v5', JSON.stringify(newState))
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

function refresh(state, action) {
	return state
}

function refreshSuccess(state, action) {
	return update(state, {
		data: {
			[action.data.profile_id]: {
				user: {
					$merge: action.data
				}
			}
		}
	})
}

function refreshFailure(state, action) {
	return state
}

function updateSetting(state, action) {
	return update(state, {
		ui: {
			isUpdatingSetting: {$set: action.key}
		}
	})
}

function updateSettingSuccess(state, action) {
	// in case you switched accounts in between 
	if (!state.ui.isUpdatingSetting)
		return state

	let ns = update(state, {
		data: {
			[state.ui.activeUser]: {
				user: {
					[action.key]: {$set: action.value}
				}
			}
		},
		ui: {
			isUpdatingSetting: {$set: null}
		}
	})
	window.localStorage.setItem('users-v5', JSON.stringify(ns))
	return ns
}

function udpateSettingFailure(state, action) {
	// in case you switched accounts in between 
	if (!state.ui.isUpdatingSetting)
		return state
	
	return update(state, {
		ui: {
			isUpdatingSetting: {$set: null}
		}
	})
}