import React from 'react'

export default function ProcessAttributeDatatype(props) {
	let text = "Text"
	if (props.type == "NUMB") {
		text = "Number"
	}

	return (
		<div className="process-attribute-datatype">
			<span>{text}</span>
		</div>
	)
}