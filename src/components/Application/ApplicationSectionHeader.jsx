import React from 'react'
import './styles/applicationsectionheader.css'

export default function ApplicationSectionHeader(props) {
	return (
		<div className="app-section-header">{props.children}</div>
	)
}
