import React from 'react'
import './styles/processattributesubmissions.css'

export default function Submissions({name, recent}) {
	return (
		<div className="submissions">
			<div>
				<span>Recent Submissions for</span>
				<span className="submission-title">{name}</span>
			</div>
			<div className="recent-subs">
				{ (recent || []).map((e, i) => <div><span key={i}>{e.value}</span></div>) }
			</div>
		</div>
	)
}
