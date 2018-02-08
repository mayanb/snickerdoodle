import React from 'react'
import './styles/formerrors.css'

export default function FormErrors({ className, errors }) {
	if (errors.length)
		return (
			<div className={`form-errors ${className}`}>
				{errors.map(error => (
					<div key={error}>{error}</div>
				))}
			</div>
		)
	else
		return null
}
