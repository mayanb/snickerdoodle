import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import AccountBasicsRow from './AccountBasicsRow'
import AccountLogout from './AccountLogout'

export default class AccountBasics extends React.Component {
	render() {
		return (
			<div className="account-basics">
				<AccountSectionHeader title="Basics" />
				<AccountBasicsRow title="Username" content={this.props.username_display}/>
				<AccountBasicsRow title="Password" content="******"/>
				<AccountLogout />
			</div>
		)
	}
}

