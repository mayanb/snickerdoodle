import React from 'react'

export default function Handle({index}) {
	return (
		<div className="process-attr-handle">
			<i className="material-icons">more_vert</i>
			<span>{index}</span>
		</div>
	)
}