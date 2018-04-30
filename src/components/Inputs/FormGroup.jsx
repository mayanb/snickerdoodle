import React from 'react'
import FormLabel from './FormLabel'
import './styles/formgroup.css'

export default function FormGroup({ className, label, children }) {
	return (
		<div className={`form-group ${className}`}>
			<FormLabel>{label}</FormLabel>
			<div className="form-field">
				{children}
			</div>
		</div>
	)
}
