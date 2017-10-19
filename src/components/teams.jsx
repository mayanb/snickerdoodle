export default function get_active_user() {
		let team = window.location.pathname.split('/')[1]
		let users = JSON.parse(window.localStorage.getItem(`users-${team}`))
		return users.data[users.ui.activeUser]
}

// {
// 	token: ...,
// 	user: {
// 		team_nam
// 		pro
// 	}
// }