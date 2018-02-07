import React from 'react'
import './styles/input.css'

export default function Input({className, ...rest}) {
	return (
		<input className={`input ${className}`} {...rest} />
	)
}