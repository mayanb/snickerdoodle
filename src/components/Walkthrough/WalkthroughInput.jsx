import React from 'react'

export default function WalkthroughInput({title, onChange, ...rest}) {
	return (
		<div className="walkthrough-input">
			{ title ? <span className="title">{title}</span> : null }
			<input {...rest} onChange={(e) => onChange(e.target.value)} />
		</div>
	)
}