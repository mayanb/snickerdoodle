import React from 'react'
import ApplicationSectionHeader from './ApplicationSectionHeader'
import './styles/applicationsectionheaderwithbutton.css'
import Button from '../Button/Button'

export default class ApplicationSectionHeaderWithButton extends React.Component {
	render() {
		let { title, buttonText, onToggleDialog } = this.props
		return (
			<ApplicationSectionHeader>
				{title}
				<Button ghost className="header-button" onClick={onToggleDialog}>{buttonText}</Button>
			</ApplicationSectionHeader>
		)
	}
}
