import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import AccountIntegration from './AccountIntegration'

export default class AccountIntegrations extends React.Component {
	render() {
		return (
			<div className="account-integrations">
				<AccountSectionHeader title="Integrations" />
				<AccountIntegration ext={this.props.ext}/>
			</div>
		)
	}
}