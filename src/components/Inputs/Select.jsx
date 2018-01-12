import React from 'react'
import ReactSelect from 'react-select'
import './styles/select.css'
import 'react-select/dist/react-select.css';

export default function Select({styleType, ...rest}) {
	return (
		<div className={'select-'+styleType}>
			<ReactSelect {...rest} />
		</div>
	)
}