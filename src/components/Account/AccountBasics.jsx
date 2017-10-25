import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import AccountBasicsRow from './AccountBasicsRow'

export default class AccountBasics extends React.Component {
	render() {
		return (
			<div className="account-basics">
				<AccountSectionHeader title="Basics" />
				<AccountBasicsRow title="Username" content={this.props.username}/>
				<AccountBasicsRow title="Password" content="******"/>
			</div>
		)
	}
}

