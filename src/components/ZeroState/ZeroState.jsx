import React from 'react'
import './styles/zerostate.css'

export default function ZeroState({ filtered }) {
	let sentence = "Looks like there's nothing here!"
	if (filtered) {
		sentence = "Looks like there's nothing here. Try expanding your search."
	}
	return (
		<div className="zero-state">
			<span>{sentence}</span>
		</div>
	)
}
