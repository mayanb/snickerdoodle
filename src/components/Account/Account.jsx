import React from 'react'
import { connect } from 'react-redux'
import AccountHeader from './AccountHeader'
import AccountBasics from './AccountBasics'
import AccountIntegrations from './AccountIntegrations'
import FactoryOptions from './FactoryOptions'
import AccountTeam from './AccountTeam'
import './styles/account.css'
import * as actions from "../AccountMenu/UserActions";

class Account extends React.Component {
	constructor(props) {
		super(props)
		this.updateFactorySetting = this.updateFactorySetting.bind(this)
	}
	render() {
		return (
			<div className="my-account">
				<AccountHeader />
				<AccountBasics />
				<AccountIntegrations ext={this.props.match.params.ext} />
				<FactoryOptions taskLabelType={this.props.user.task_label_type} onSubmit={this.updateFactorySetting}/>
				<AccountTeam />
			</div>
		)
	}
	
	updateFactorySetting(key, value) {
		this.props.dispatch(actions.updateUserSetting(this.props.user.team, key, value))
	}
}

const mapStateToProps = (state/*, props*/) => {
	const {data, ui} = state.users
	const user = data[ui.activeUser].user
  return {
    users: state.users,
		user: user,
  }
}

const connected = connect(mapStateToProps)(Account)

export default connected
