import React from 'react'

export default function NavigationFeedback(props) {
	return (
		<div className="nav-feedback">
			<span>Bugs? Questions?</span>
			<a
				href="https://goo.gl/forms/h3uINKz62Q5bN8qP2"
				target="_blank"
				rel="noopener noreferrer"
			>
				Talk to us.
			</a>
			<span>Or visit the </span>
			<a
				href="https://polymer-publications.gitbooks.io/getting-started/content/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Getting Started guide.
				<i className="material-icons expand-i">open_in_new</i>
			</a>
		</div>
	)
}