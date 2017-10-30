import React from 'react'

export default function AccountBasicsRow(props) {
	return (
		<div className="account-basics-row">
			<div>
				<span>{props.title}</span>
			</div>
			<div>
				<span>{props.content}</span>
			</div>
		</div>
	)
}