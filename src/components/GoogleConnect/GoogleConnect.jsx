import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../AccountMenu/UserActions'
import Button from '../Card/Button.jsx'
import api from '../WaffleconeAPI/api.jsx'

class GoogleConnect extends React.Component {

	constructor(props) {
    	super(props)
		this.disconnectGoogleAccount = this.disconnectGoogleAccount.bind(this);
  	}

	componentDidMount() {
		let c = this
		console.log(this.props)

		if (this.props.match.params.ext) {
			console.log(window.location.href)
			api.post('/gauth/create-auth-token/')
				.type('form')
				.send({auth_response: window.location.href})
				.send({user_id: api.get_active_user().user.user_id})
				.end(function (err, res) {
					if (err || !res.ok) {
						console.log(res.text)
					}
					else {
						console.log(res)
						c.props.dispatch(actions.setGoogleAuthentication(true))
						let email = JSON.parse(res.text)
						console.log(email["email"])
						c.props.dispatch(actions.setGoogleEmail(email["email"]))
						window.location.href = window.location.origin + "/team/"
					}
				})
		}
	}

	render() {
		let hasToken = api.get_active_user().user.has_gauth_token
		let email = api.get_active_user().user.gauth_email
		if (hasToken)
			return (
				<div>
					<span>You have already connected to a google account {email} </span>
					<Button onClick={this.disconnectGoogleAccount}>Disconnect google account</Button>
				</div>
			)

		if (!this.props.match.params.ext) {
			return (
				<div>
					<span>{JSON.stringify(window.location.href)}</span>
					<Button onClick={connectGoogleAccount}>Connect google account</Button>
				</div>
			)
		}

		return (
			<div>
				<span>{JSON.stringify(window.location.href)}</span>
				<Button disabled>Connected to Google</Button>
			</div>
		)
	}


	disconnectGoogleAccount() {
		let c = this
		let userID = api.get_active_user().user.user_id
		console.log(userID)
		api.post('/gauth/clear-token/')
			.send({user_id: userID})
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(res.text)
				}
				else {
					console.log(res)
					c.props.dispatch(actions.setGoogleAuthentication(false))
					c.props.dispatch(actions.setGoogleEmail(null))
				}
			})
	}


}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const conncetedGoogleConnect = connect(mapStateToProps)(GoogleConnect)

export default conncetedGoogleConnect

function connectGoogleAccount() {
	api.get('/gauth/create-auth-url/')
		.query({user_id: api.get_active_user().user.user_id})
		.end(function (err, res) {
			console.log(res)
			window.location.href = res.text
		})
}

