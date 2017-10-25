import React from 'react'
import { connect } from 'react-redux'
import AccountHeader from './AccountHeader'
import AccountBasics from './AccountBasics'
import AccountIntegrations from './AccountIntegrations'

class Account extends React.Component {
	render() {
		let {data, ui} = this.props.users
		let account = data[ui.activeUser]
		return (
			<div className="my-account">
				<AccountHeader />
				<AccountBasics  {...account.user} />
				<AccountIntegrations />
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connected = connect(mapStateToProps)(Account)

export default connected

