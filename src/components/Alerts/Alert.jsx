import React from 'react'

export default function Alert(props) {
	let icon = 'check_circle'
	let mood = 'positive'
	if (props.negative) {
		icon = 'error'
		mood = 'negative'
	}

	return (
		<div className="alert">
			<div className="alert-text">
				<i className={"material-icons alert-circle " + mood}>{icon}</i>
				<span>{props.alert}</span>
			</div>
			<div style={{marginLeft: "28px", marginTop: "8px"}}>
				{props.children}
			</div>
		</div>
	)
}