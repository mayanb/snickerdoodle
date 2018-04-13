import React from 'react'
import './styles/antdesignformgroup.css'

export default function AntDesignFormGroup({ className, label, children }) {
	return (
		<div className={`form-group ${className}`}>
			<label>{label}</label>
			<div className="form-field">
				{children}
			</div>
		</div>
	)
}
