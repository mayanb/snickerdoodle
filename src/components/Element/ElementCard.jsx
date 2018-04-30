import React from 'react'
import './styles/elementcard.css'

export default function ElementCard({className, selected, index, handle, onDelete, onClick, children}) {
	let delete_component = onDelete && (
		<div className="process-attr-delete">
			<i className="material-icons" onClick={onDelete}>delete</i>
		</div>
	)

	let handle_component = handle && <Handle index={index} />

	return (
		<div className={"element-card-wrapper " + (selected ? "selected " : "")}>
			{ handle_component }
			<div className={"element-card " + className} onClick={onClick}>
				{children}
			</div>
			{delete_component}
		</div>
	)
}

function Handle({index}) {
	return (
		<div className="process-attr-handle">
			<i className="material-icons">more_vert</i>
			<span>{index}</span>
		</div>
	)
}