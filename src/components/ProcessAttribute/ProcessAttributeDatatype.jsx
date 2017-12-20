import React from 'react'
import Img from '../Img/Img'

export default function ProcessAttributeDatatype(props) {
	let img = "alphabetical"
	let text = "Text"
	if (props.type == "NUMBER") {
		img = "numeric"
		text = "Number"
	}

	return (
		<div className="process-attribute-datatype">
			<Img height="20px" src={img} />
			<span>{text}</span>
		</div>
	)
}