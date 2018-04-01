import React from 'react'
import Button from '../Card/Button'
import ProcessAttributeList from '../ProcessAttribute/ProcessAttributeList'
import "./styles/processattributes.css"

export default function ProcessAttributes({process}) {
	return (
		<div className="process-attributes">
			<ProcessAttributesHeader />
			<ProcessAttributeList process={process}/>
		</div>
	)
}