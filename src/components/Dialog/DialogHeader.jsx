import React from 'react'
import './styles/dialogheader.css'

export default function DialogHeader(props) {
	return (
		<div className="dialog-header">
				{props.children}
				<i className="material-icons" onClick={props.onToggle}>close</i>
		</div>
	)
}

