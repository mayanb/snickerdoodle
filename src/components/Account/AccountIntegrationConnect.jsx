import React from 'react'
import {connect} from 'react-redux'
import api from '../WaffleconeAPI/api'
import * as actions from '../AccountMenu/UserActions'
import {
	AccountIntegrationConnecting, 
	AccountIntegrationConnected, 
	AccountIntegrationDoConnect
} from './AccountIntegrationConnectHelpers'

class AccountIntegrationConnect extends React.Component {

	componentDidMount() {
		// this code is called ONLY IF we are currently in the process of getting a token!!
		if (this.props.ext) 
			this.requestCreateAccessToken()
	}

	render() {
		let {data, ui} = this.props.users
		let user = data[ui.activeUser]

		if (this.props.ext) {
			return <AccountIntegrationConnecting />
		}

		if (user.user.gauth_email) {
			return <AccountIntegrationConnected user={user} onClick={this.disconnectGoogleAccount.bind(this)} />
		}
		return <AccountIntegrationDoConnect onClick={this.connectGoogleAccount.bind(this)} />
	}

	connectGoogleAccount() {
		api.get('/gauth/create-auth-url/')
			.query({user_id: api.get_active_user().user.user_id})
			.end(function (err, res) {
				console.log(res)
				window.location.href = res.text
			})
	}

	disconnectGoogleAccount() {
		console.log('disconnecting')
		let c = this
		let userID = api.get_active_user().user.user_id
		api.post('/gauth/clear-token/')
			.send({user_id: userID})
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(res.text)
				}
				else {
					c.props.dispatch(actions.setGoogleAuthentication(false))
					c.props.dispatch(actions.setGoogleEmail(null))
				}
			})
	}

	requestCreateAccessToken() {
		let c = this
		api.post('/gauth/create-auth-token/')
			.type('form')
			.send({auth_response: window.location.href})
			.send({user_id: api.get_active_user().user.user_id})
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(res.text)
				}
				else {
					c.props.dispatch(actions.setGoogleAuthentication(true))
					let email = JSON.parse(res.text)
					c.props.dispatch(actions.setGoogleEmail(email["email"]))
					window.location.href = window.location.origin + "/account/"
				}
			})
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(AccountIntegrationConnect)
