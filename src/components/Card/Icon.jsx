import React from 'react'

export default function Icon(props) {
	let size = props.size || "30px"
	return (
		<div className="icon" style={{height: size, width:size, borderRadius: size}}>
		</div>
	)
}