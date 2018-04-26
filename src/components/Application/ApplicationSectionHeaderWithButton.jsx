import React from 'react'
import ApplicationSectionHeader from './ApplicationSectionHeader'
import './styles/applicationsectionheaderwithbutton.css'

export default class ApplicationSectionHeaderWithButton extends React.Component {
	render() {
		let { title, buttonText, onToggleDialog } = this.props
		return (
			<ApplicationSectionHeader>
				{title}
				<button className="header-button" onClick={onToggleDialog}>{buttonText}</button>
			</ApplicationSectionHeader>
		)
	}
}
