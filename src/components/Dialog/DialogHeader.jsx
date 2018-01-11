import React from 'react'
import './styles/dialog.css'

export default function DialogHeader(props) {
	return (
		<div className="dialog-header">
			<h2>{props.children}</h2>
			<Rule />
		</div>
	)
}

function Rule(props) {
	return <div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}}/>
}