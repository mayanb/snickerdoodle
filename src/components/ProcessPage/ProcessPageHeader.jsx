import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'

export default function ProcessPageHeader({processName, history}) {
	return (
		<ApplicationSectionHeader>
			<div className="process-page-header">
				<i className="material-icons" onClick={() => history.push('/processes')}>arrow_back</i>
				<span>{`Processes / ${processName}`}</span>
			</div>
		</ApplicationSectionHeader>
	)
}