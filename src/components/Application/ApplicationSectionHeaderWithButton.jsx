import React from 'react'
import './styles/applicationsectionheaderwithbutton.css'
import { Button } from 'antd'

export default class ApplicationSectionHeaderWithButton extends React.Component {
	render() {
		let { title, buttonText, onToggleDialog } = this.props
		return (
			<div className="app-section-header">
				{title}
				<Button ghost className="header-button" onClick={onToggleDialog}>{buttonText}</Button>
			</div>
		)
	}
}
