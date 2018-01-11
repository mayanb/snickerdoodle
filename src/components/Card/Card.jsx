import React from 'react'
import './styles/card.css'

export default function Card(props) {
	return (
		<div className={"card" + (props.big?" big":"")}>
			{props.children}
		</div>
	)
}