import React from 'react'
import Img from '../Img/Img'
import AlertDetailsDialog from './AlertDetailsDialog'

export default class Alert extends React.Component {
	constructor(props) {
		super(props)
		this.state = { showAlertDetails: false }

		this.renderAlertDetailsDialog = this.renderAlertDetailsDialog.bind(this)
		this.toggleAlertDetailsDialog = this.toggleAlertDetailsDialog.bind(this)
		this.renderViewAll = this.renderViewAll.bind(this)
	}

	render() {
		let { negative, warning, alert, details } = this.props
		let icon = 'checkmark'
		if (negative) {
			icon = 'warning'
		} else if (warning) {
			icon = 'warning'
		}

		return (
			<div className="alert-container">
				<div className="alert">
					<div className="alert-text">
						<Img src={`${icon}@2x`} height="20px" />
						<span>{alert}</span>
						<div className="new-alert" />
					</div>
					<div>
						{details.slice(0, 3)}
					</div>
					{this.renderViewAll()}
					{this.renderAlertDetailsDialog()}
				</div>
			</div>
		)
	}

	renderViewAll() {
		if (this.props.details.length > 3) {
			return (
				<div className="view-all" onClick={this.toggleAlertDetailsDialog}>View all</div>
			)
		} else {
			return null
		}
	}

	renderAlertDetailsDialog() {
		if (this.state.showAlertDetails) {
			return (
				<AlertDetailsDialog
					title={this.props.alert}
					details={this.props.details}
					onToggle={this.toggleAlertDetailsDialog}
				/>
			)
		} else {
			return null
		}
	}

	toggleAlertDetailsDialog() {
		this.setState({ showAlertDetails: !this.state.showAlertDetails })
	}
}

