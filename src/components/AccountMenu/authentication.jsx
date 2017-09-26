import jwt_decode from 'jwt-decode'

export default function shoudLogin(users) {
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