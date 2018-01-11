import React from 'react'
import './styles/button.css'

export default function Button({secondary, link, ...rest}) {
	let className=secondary?" secondary ":""
	className = className + (link?" link ":"")
	return (
		<button {...rest} className={className}>{rest.children}</button>
	)
}