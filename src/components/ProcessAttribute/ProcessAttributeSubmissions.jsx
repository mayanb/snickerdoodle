import React from 'react'
import './styles/processattributesubmissions.css'

export default function Submissions({name}) {
	return (
		<div className="submissions">
			<div>
				<span>Recent Submissions for</span>
				<span className="submission-title">{name}</span>
			</div>
			<RecentSubmissions />
		</div>
	)
}


function RecentSubmissions(props) {
	let recent = ["Hello", "my", "name", "is", "ishita"]
	return (
		<div className="recent-subs">
			{ recent.map((e, i) => <span key={i}>{e}</span>) }
		</div>
	)
}