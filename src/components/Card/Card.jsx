import React from 'react'

export default function Card(props) {
	return (
		<div className={"card" + (props.big?" big":"") + (props.nopadding?" nopadding":"")}>
			{props.children}
		</div>
	)
}