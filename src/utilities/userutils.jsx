export function getStoredUsername(username, team_name) {
	return username.toLowerCase() + '_' + team_name.toLowerCase()
}

export function isDandelion(team) {
		return team === 'alabama' || team === 'valencia'
}


export function shouldShowChecklist(team) {
	return (
		!isDandelion(team) && 
		team !== 'endorfin' && 
		team !== 'indichocolate' && 
		team !== 'teammindo' && 
		team !== 'soma' && 
		team !== 'fruition' &&
		team !== 'mkec'
	)
}

const PERSISTENT_USERS_KEY = 'users-v5'

export function get_active_user() {
	let users = getPersistentUserData()
	return users.data[users.ui.activeUser]
}

export function getPersistentUserData() {
	return JSON.parse(window.localStorage.getItem(PERSISTENT_USERS_KEY))
}

export function updatePersistentUserData(data) {
	window.localStorage.setItem(PERSISTENT_USERS_KEY, JSON.stringify(data))
}