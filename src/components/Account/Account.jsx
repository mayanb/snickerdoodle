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
		this.callFunc = this.callFunc.bind(this)
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
				{isAdmin(user) && <FactoryOptions taskLabelType={user.task_label_type} onClick={this.callFunc} onSubmit={this.updateFactorySetting}/>}
				<AccountTeam />
			</div>
		)
	}
	
	callFunc(){
		if(this.props.isUpdatingSetting) {
			return
		}
		console.log(this.props.user.time_format)
		let new_format
		if(this.props.user.time_format === 'm'){
			new_format = 'n'
		} else{
			new_format = 'm'
		}
	    console.log(new_format)
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
	console.log(user)
  return {
        users: state.users,
		user: user,
		isUpdatingSetting: ui.isUpdatingSetting,
  }
}

const connected = connect(mapStateToProps)(Account)

export default connected
