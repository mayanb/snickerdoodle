import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'

export default function ProcessPageHeader({processName}) {
	return (
		<ApplicationSectionHeader>
			<div className="process-page-header">
				<i className="material-icons">arrow_back</i>
				<span>{`Processes / ${processName}`}</span>
			</div>
		</ApplicationSectionHeader>
	)
}