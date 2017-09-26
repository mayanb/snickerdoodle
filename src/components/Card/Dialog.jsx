import React from 'react'
import Card from './Card.jsx'

export default function Dialog(props) {
	return (
		<div className="dialog-container">
			<div className="dialog-shim" onClick={props.onToggle}/>
			<div className="dialog-card">
					<Card>
						{props.children}
					</Card>
				</div>
		</div>
	)
}