import React from 'react'
import { connect } from 'react-redux'
import Card from '../Card/Card'
import Button from '../Card/Button'
import Switch from '../Switch/Switch'
import AccountBasicsRow from './AccountBasicsRow'
import AccountLogout from './AccountLogout'
import AccountDetailsEdit from './AccountDetailsEdit'
import * as actions from '../AccountMenu/UserActions'

let keyDisplays = {
	password: 'Password', 
	username_display: 'Username', 
	email: 'Email Address'
}

class AccountBasics extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
		}
		this.handleStartEditing = this.handleStartEditing.bind(this)
	}


	render() {
		return (
				<div className="account-basics">
					{ this.renderAccountDetailsEditDialog() }
					<Card>
						<AccountBasicsRow title="Username" content={this.props.username_display.toLowerCase()}/>
						<AccountBasicsRow title="Password" content="******"/>
						{ this.renderEmailRow() }
						<AccountBasicsRow title="Daily email report" content={this.renderDailyEmailSwitch()} />
						<AccountLogout />
					</Card>
				</div>
		)
	}

	renderEmailRow() {
		let editFunction = () => this.handleStartEditing('email')
		if (this.props.email) {
			return <AccountBasicsRow title="Email Address" content={this.props.email} edit={editFunction}/>
		}
		let button = <Button link onClick={editFunction}>Set an email now</Button>
		return  <AccountBasicsRow title="Email Address" content={button}/>
	}

	renderDailyEmailSwitch() {
		return (
			<div>
				<Switch 
					value={this.props.email && this.props.send_emails} 
					onClick={() => this.updateUserSetting('send_emails', !this.props.send_emails)}
				/>
				<span style={{fontSize: "12px", marginLeft: "8px", lineHeight: "16px", display: "inline-block"}}>(Set an email address to enable)</span>
			</div>
		)
	}

	renderAccountDetailsEditDialog() {
		if (!this.state.editing)
			return

		return (
			<AccountDetailsEdit 
				keyword={this.state.key}
				keyDisplay={keyDisplays[this.state.key]}
				initialValue={this.props[this.state.key]}
				onSubmit={(value) => this.updateUserSetting(this.state.key, value)} 
				onCancel={() => this.setState({editing: false}) }
			/>
		)
	}

	/* EVENT HANDLERS */

	handleStartEditing(key) {
		this.setState({
			editing: true,
			key: key
		})
	}

	updateUserSetting(key, value) {
		this.props.dispatch(actions.updateUserSetting(this.props.profile_id, key, value))
	}
}


const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	let account = data[ui.activeUser]
  return account.user
}

export default connect(mapStateToProps)(AccountBasics)
