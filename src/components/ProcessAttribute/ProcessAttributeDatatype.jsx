import React from 'react'

const DATA_TYPE_LABELS = {
	TEXT: 'Text',
	NUMB: 'Number',
	DATE: 'Date',
	TIME: 'Time',
	USER: 'User'
}

export default function ProcessAttributeDatatype(props) {
	return (
		<div className="process-attribute-datatype">
			<span>{DATA_TYPE_LABELS[props.type]}</span>
		</div>
	)
}