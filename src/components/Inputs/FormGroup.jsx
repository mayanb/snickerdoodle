import React from 'react'
import './styles/formgroup.css'

export default function FormGroup({ className, label, children }) {
	return (
		<div className={`form-group ${className}`}>
			<label>{label}</label>
			<div className="form-field">
				{children}
			</div>
		</div>
	)
}
