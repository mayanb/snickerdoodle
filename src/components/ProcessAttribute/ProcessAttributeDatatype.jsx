import React from 'react'
import Img from '../Img/Img'

export default function ProcessAttributeDatatype(props) {
	let img = "alphabetical"
	let text = "Text"
	if (props.type == "NUMB") {
		img = "numeric"
		text = "Number"
	}

	return (
		<div className="process-attribute-datatype">
			<span>{text}</span>
		</div>
	)
}