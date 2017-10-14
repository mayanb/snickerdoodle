import React from 'react'

export default function Checkbox(props) {
	let basic = {
		border: "1px solid rgba(0,0,0,0.1)",
		borderRadius: props.size,
		height: props.size,
		width: props.size
	}

	let checked = {
		borderRadius: props.size,
		height: props.size,
		width: props.size,
		backgroundColor: '#2198EE'
	}

	return (
		<div style={props.checked?checked:basic} />
	)
}