import React from 'react'

export default function Button(props) {
	let className=props.secondary?"secondary":""
	return (
		<button {...props} className={className}>{props.children}</button>
	)
}