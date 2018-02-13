export function getStoredUsername(username, team_name) {
	return username.toLowerCase() + '_' + team_name.toLowerCase()
}