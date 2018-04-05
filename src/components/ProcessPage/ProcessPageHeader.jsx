import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'

export default function ProcessPageHeader({processName, onBack}) {
	return (
		<ApplicationSectionHeader>
			<div className="process-page-header">
				<i className="material-icons" onClick={onBack}>arrow_back</i>
				<span>{`Processes / ${processName}`}</span>
			</div>
		</ApplicationSectionHeader>
	)
}