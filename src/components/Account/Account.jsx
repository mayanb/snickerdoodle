import React from 'react'
import { connect } from 'react-redux'
import AccountHeader from './AccountHeader'
import AccountBasics from './AccountBasics'
import AccountIntegrations from './AccountIntegrations'
import FactoryOptions from './FactoryOptions'
import AccountTeam from './AccountTeam'
import './styles/account.css'
import * as actions from "./TeamActions"
import * as userActions from '../AccountMenu/UserActions'
import {isAdmin} from '../../authentication/authentication'

class Account extends React.Component {
	constructor(props) {
		super(props)
		this.updateFactorySetting = this.updateFactorySetting.bind(this)
		this.updateTimeFormat = this.updateTimeFormat.bind(this)
	}
	
	componentDidMount() {
		this.props.dispatch(userActions.requestRefreshUserAccount(this.props.user.id))
	}
	
	render() {
		const { match, user } = this.props
		return (
			<div className="my-account">
				<AccountHeader />
				<AccountBasics />
				<AccountIntegrations ext={match.params.ext} />
				{isAdmin(user) && <FactoryOptions teamInfo={user.time_format} taskLabelType={user.task_label_type} onClick={this.updateTimeFormat} onSubmit={this.updateFactorySetting}/>}
				<AccountTeam />
			</div>
		)
	}

	updateTimeFormat(){	
		if(this.props.isUpdatingSetting) {
			return
		}

		let new_format
		if(this.props.user.time_format === 'm'){
			new_format = 'n'
		} else{
			new_format = 'm'
		}
		this.updateFactorySetting('time_format', new_format);
	}

	updateFactorySetting(key, value) {
		if (this.props.isUpdatingSetting) {
			return
		}
		this.props.dispatch(actions.updateLabelType(this.props.user.team, key, value))
	}
}

const mapStateToProps = (state/*, props*/) => {
	const {data, ui} = state.users
	const user = data[ui.activeUser].user
  return {
    users: state.users,
		user: user,
		isUpdatingSetting: ui.isUpdatingSetting,
  }
}

const connected = connect(mapStateToProps)(Account)

export default connected
