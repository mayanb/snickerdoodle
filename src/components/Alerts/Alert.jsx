import React from 'react'
import Img from '../Img/Img'

export default function Alert(props) {
	let icon = 'positive'
	if (props.negative) {
		icon = 'negative'
	} else if (props.warning) {
		icon = 'warning'
	}

	return (
		<div className="alert">
			<div className="alert-text">
				<Img src={`${icon}@2x`} height="20px"/>
				<span>{props.alert}</span>
				<div className="new-alert" />
			</div>
			<div style={{marginLeft: "28px", marginTop: "8px"}}>
				{props.children}
			</div>
		</div>
	)
}