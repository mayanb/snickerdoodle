import React from 'react'
import {connect} from 'react-redux'
import GoogleConnect from '../GoogleConnect/GoogleConnect'

class AccountIntegration extends React.Component {
	render() {
		return (
			<div className="account-integration">
				<div className="integration-info">
					<div>
						<span>Google Spreadsheets</span>
					</div>
					<div>
						{this.renderIntegratedAccount()}
					</div>
				</div>
				<div className="integration-detail">
					<span>Upload activity information to spreadsheets in your Google Drive.</span>
				</div>
			</div>
		)
	}

	renderIntegratedAccount() {
		let {data, ui} = this.props.users
		let user = data[ui.activeUser]
		if (user.gauth_email) {
			return <span>{user.gauth_email}</span>
		}

		return <GoogleConnect />
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connected = connect(mapStateToProps)(AccountIntegration)

export default connected
