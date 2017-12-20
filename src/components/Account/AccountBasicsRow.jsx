import React from 'react'

export default function AccountBasicsRow(props) {
	return (
		<div className="account-basics-row">
			<div>
				<span>{props.title}</span>
			</div>
			<div>
				<span>{props.content}</span>
			</div>
			<div>
				{ renderEditIfEditable(props) }
			</div>
		</div>
	)
}

function renderEditIfEditable(props) {
	if (!props.edit) {
		return null
	} 
	return <span><i className="material-icons" onClick={props.edit}>mode_edit</i></span>
}