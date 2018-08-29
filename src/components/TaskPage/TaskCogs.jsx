import React from 'react'
import Card from '../Card/Card'

export default function TaskCogs({ task }) {
	return (
		<Card>
			<div style={{display: "flex", flexDirection: "column"}}>
				<span style={{fontWeight:700}}>COGS data</span>
				<span>Cost to create: {format(task.cost)}</span> 
				<span>Remaining value: {format(task.remaining_worth)}</span>
			</div>
		</Card>
	)
}

function format(n) {
	return '$' + parseFloat(n || 0).toFixed(2)
}