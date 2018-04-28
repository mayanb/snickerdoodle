import React from 'react'

export default function FormLabel({children, ...rest}) {
	return ( 
		<div className="form-label">
			<label>{children}</label>
		</div>
	)
}