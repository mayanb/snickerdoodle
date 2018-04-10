import React from 'react'
import './styles/processattributesubmissions.css'

export default function Submissions({name, recent, datatype}) {
	let recentValues = recent ? recent.map(e => e.value) : []
	if(datatype === 'BOOL') {
		recentValues = recentValues.map(val => val === 'true' ? 'Yes' : 'No')
	}
	return (
		<div className="submissions">
			<div>
				<span>Recent Submissions for</span>
				<span className="submission-title">{name}</span>
			</div>
			<div className="recent-subs">
				{ (recentValues).map((value, i) => <div key={i}><span>{value}</span></div>) }
			</div>
		</div>
	)
}
