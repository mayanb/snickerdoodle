import React from 'react'
import ReactSelect from 'react-select'
import './styles/input.css'

export default function Select({style, ...rest}) {
	return (
		<input className={"input-"+style} {...rest} />
	)
}