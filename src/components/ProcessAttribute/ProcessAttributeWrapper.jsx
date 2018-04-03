import React from 'react'
import Handle from './ProcessAttributeHandle'

export default function Wrapper({className, index, onDelete, onClick, children}) {
	let delete_component = onDelete && (
		<div className="process-attr-delete">
			<i className="material-icons" onClick={onDelete}>delete</i>
		</div>
	)

	return (
		<div className={"process-attr-wrapper " + className}>
			<Handle index={index} />
			<div className="process-attribute" onClick={onClick}>
				{children}
			</div>
			{delete_component}
		</div>
	)
}