import jwt_decode from 'jwt-decode'

export function shouldLogin(users) {
	try {
		let {data, ui} = users

		// if we are in the middle of adding a user, 
		// yes we should display the login page
		if (ui.isAddingAccount) {
			return true
		}

		let unix = Math.round(+new Date()/1000);
		let authAccount = data[ui.activeUser]
		let jwt = authAccount.token
		return (!jwt || (jwt_decode(jwt).exp <= unix))

	} catch(e) {
		return true
	}
}

const TIME_TO_REFRESH = 200 // in seconds
export function shouldRefresh(users) {
	let {data, ui} = users	
  let last_fetched = data[ui.activeUser].last_fetched
  return !last_fetched || ((new Date() - last_fetched) / 1000 > TIME_TO_REFRESH)
}

let WALKTHROUGH_COMPLETED = -1
export function shouldCompleteWalkthrough(users) {
	let {data, ui} = users	
  let walkthrough = data[ui.activeUser].walkthrough
  return (walkthrough !== WALKTHROUGH_COMPLETED)
}

export function isAdmin(user) {
	return user.account_type == 'a'
}

export function isRegular(user) {
	return user.account_type == 'w'
}