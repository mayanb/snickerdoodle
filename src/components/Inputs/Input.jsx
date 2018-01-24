import React from 'react'
import './styles/input.css'

export default function Select({styleType, ...rest}) {
	return (
		<input className={"input-"+styleType} {...rest} />
	)
}