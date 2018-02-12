import React from 'react'
import Img from '../Img/Img'

export default class Alert extends React.Component {
	render() {
		let { negative, warning, alert } = this.props
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
						<Img src={`${icon}@2x`} height="20px" className="alert-icon"/>
						<span>{alert}</span>
						<div className="new-alert" />
					</div>
					<div>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}


}

