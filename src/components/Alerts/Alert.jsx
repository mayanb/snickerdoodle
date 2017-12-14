import React from 'react'

export default function Alert(props) {
	let icon = 'check_circle'
	let mood = 'positive'
	if (props.negative) {
		icon = 'error'
		mood = 'negative'
	} else if (props.warning) {
		icon = 'warning'
		mood = 'warning'
	}

	return (
		<div className="alert">
			<div className="alert-content">
				<div className="alert-text">
					<i className={"material-icons alert-circle " + mood}>{icon}</i>
					<span>{props.alert}</span>
				</div>
				<div className="alert-actions">
					{props.children}
				</div>
			</div>
			<i className="material-icons alert-close">close</i> {/* TODO: Add close/dismiss functionality */}
		</div>
	)
}