import React from 'react'
import './styles/applicationsectionheaderwithbutton.css'
import Button from '../Card/Button.jsx'

export default class ApplicationSectionHeaderWithButton extends React.Component {
	render() {
		let { title, buttonText, onToggleDialog } = this.props
		return (
			<div className="app-section-header">
				{title}
				<button className="header-button" onClick={onToggleDialog}>{buttonText}</button>
			</div>
		)
	}
}
