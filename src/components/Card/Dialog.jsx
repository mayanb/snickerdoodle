import React from 'react'
import Card from './Card.jsx'

export default function Dialog(props) {
	return (
		<div className="dialog-container">
			<div className="dialog-shim" onClick={props.onToggle}/>
			<div className={"dialog-card " + props.className}>
					<Card>
						{props.children}
					</Card>
				</div>
		</div>
	)
}