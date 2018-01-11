import React from 'react'
import ReactSelect from 'react-select'
import './styles/select.css'

export default function Select({style, ...rest}) {
	return (
		<div className={'select-'+style}>
			<ReactSelect {...rest} />
		</div>
	)
}