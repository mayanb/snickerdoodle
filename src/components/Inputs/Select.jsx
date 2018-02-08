import React from 'react'
import ReactSelect from 'react-select'
import './styles/select.css'
import 'react-select/dist/react-select.css';

export default function Select({className, ...rest}) {
	return (
		<div className={`select ${className}`}>
			<ReactSelect {...rest} />
		</div>
	)
}