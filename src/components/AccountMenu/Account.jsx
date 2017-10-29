import React from 'react'
import Icon from '../Card/Icon'

export default function Account(props) {
	let { onClick, user} = props
	return (
		<div className="account" onClick={onClick}>
			<div>
				<Icon size="32px" />
			</div>
			<div>
				<span className="name">{user.team_name}</span>
				<span className="username">{`@${user.username_display}`}</span>
			</div>
		</div>
	)
}