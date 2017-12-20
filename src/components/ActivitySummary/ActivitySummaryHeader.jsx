import React from 'react'

export default function ActivitySummaryHeader(props) {
	return (
		<div className="activity-row header">
			<div style={{flex: 1}}></div>
			<div style={{flex: 8}}><span>Type</span></div>
			<div style={{flex: 3}}><span>Output</span></div>
			<div style={{flex: 1}}><span>Runs</span></div>
		</div>
	)
}