export function getStoredUsername(username, team_name) {
	return username.toLowerCase() + '_' + team_name.toLowerCase()
}

export function isDandelion(team) {
		return team === 'alabama' || team === 'valencia'
}


export function shouldShowChecklist(team) {
	return !isDandelion(team) && team !== 'endorfin' && team !== 'indichocolate' && team !== 'teammindo' && team !== 'soma' && team !== 'fruition'
}