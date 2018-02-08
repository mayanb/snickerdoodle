import React from 'react'
import './styles/textarea.css'

export default function Textarea({className, ...rest}) {
	return (
		<textarea className={`textarea ${className}`} {...rest} />
	)
}