import React from 'react'

export default function AttributeType(props) {
	if (props.type == 'TEXT')
		return <i className="material-icons"></i>

	if (props.type == 'NUMB')
		return <i className="material-icons"></i>

	if (props.type == 'DATE')
		return <i className="material-icons"></i>

	if (props.type == 'TIME')
		return <i className="material-icons"></i>
}