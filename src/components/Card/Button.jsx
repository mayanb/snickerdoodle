import React from 'react'

export default function Button({secondary, ...rest}) {
	let className=secondary?"secondary":""
	return (
		<button {...rest} className={className}>{rest.children}</button>
	)
}