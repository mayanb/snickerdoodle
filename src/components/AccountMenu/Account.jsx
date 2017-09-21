import React from 'react'
import Icon from '../Card/Icon'

export default function Account(props) {
	let { onClick, team} = props
	return (
		<div className="account" onClick={onClick}>
			<div>
				<Icon size="32px" />
			</div>
			<div>
				<span className="name">{`${team.first_name} ${team.last_name}`}</span>
				<span className="username">{`@${team.username}`}</span>
			</div>
		</div>
	)
}