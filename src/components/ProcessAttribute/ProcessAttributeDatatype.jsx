import React from 'react'
import { ATTRIBUTE_TYPES } from '../../utilities/constants'

export default function ProcessAttributeDatatype({type}) {
	const label = ATTRIBUTE_TYPES.find(a => a.value === type).label
	return (
		<div className="process-attribute-datatype">
			<span>{label}</span>
		</div>
	)
}