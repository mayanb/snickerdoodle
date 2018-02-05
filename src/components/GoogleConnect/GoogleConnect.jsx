import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../AccountMenu/UserActions'
import api from '../WaffleconeAPI/api.jsx'

class GoogleConnect extends React.Component {

	constructor(props) {
    	super(props)
		this.disconnectGoogleAccount = this.disconnectGoogleAccount.bind(this);
  	}


	componentDidMount() {

		// this code is called ONLY IF we are currently in the process of getting a token!!
		let c = this
		if (this.props.ext) {
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

	render() {
		if (!this.props.ext) {
			return (
				<span className="google-connect" onClick={connectGoogleAccount}>Connect account</span>
			)
		}

		return <span>Connecting...</span>
	}

	disconnectGoogleAccount() {
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

