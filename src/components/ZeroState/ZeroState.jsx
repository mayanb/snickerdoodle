import React from 'react'
import './styles/zerostate.css'

export default function ZeroState(props) {
	var sentence = "Looks like there's nothing here!"
	if (props.filtered) {
		sentence = "Looks like there's nothing here. Try expanding your search."
	}
	return (
		<div className="zero-state">
			<span>{sentence}</span>
		</div>
	)
}
