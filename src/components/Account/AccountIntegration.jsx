import React from 'react'
import AccountIntegrationConnect from './AccountIntegrationConnect'

export default function AccountIntegration(props) {
	return (
		<div className="account-integration">
			<div className="integration-info">
				<div>
					<span>Google Spreadsheets</span>
				</div>
				<AccountIntegrationConnect ext={props.ext}/>
			</div>
			<div className="integration-detail">
				<span>With the Google Drive integration, you can upload team, task, activity, and inventory information to a spreadsheet in Google Drive.</span>
			</div>
		</div>
	)
}
