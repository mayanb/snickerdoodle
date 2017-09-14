import React from 'react'
import Card from './Card.jsx'

export default function Dialog(props) {
	return (
		<div className="dialog-shim">
			<div className="dialog-box">
				<Card>
					{props.children}
				</Card>
			</div>
		</div>
	)
}