import React from 'react'
import { connect } from 'react-redux'
import AccountHeader from './AccountHeader'
import AccountBasics from './AccountBasics'
import AccountIntegrations from './AccountIntegrations'
import AccountTeam from './AccountTeam'
import './styles/account.css'

class Account extends React.Component {
	render() {
		let {data, ui} = this.props.users
		let account = data[ui.activeUser]
		return (
			<div className="my-account">
				<AccountHeader />
				<AccountBasics />
				<AccountIntegrations ext={this.props.match.params.ext} />
				<AccountTeam />
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

// <AccountIntegrations ext={this.props.match.params.ext}/>
