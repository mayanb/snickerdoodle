import React from 'react'
import Button from '../Card/Button.jsx'
import api from '../WaffleconeAPI/api.jsx'

export default class GoogleConnect extends React.Component {

	componentDidMount() {
		if (this.props.match.params.ext) {
			console.log(window.location.href)
			api.post('/gauth/create-auth-token/')
				.type('form')
				.send({auth_response: window.location.href})
				.send({user_id: 5})
				.end(function (err, res) {
					if (err || !res.ok) {
						alert("UGH\n" + err)
						console.log(res)
					}
					else {
						console.log(res)
					}
				})
		}
	}

	render() {
		if (!this.props.match.params.ext) {
			return (
				<div>
					<span>{JSON.stringify(window.location.href)}</span>
					<Button onClick={connect}>Connect</Button>
				</div>
			)
		}

		return (
			<div>
				<span>{JSON.stringify(window.location.href)}</span>
				<Button disabled>Connecting...</Button>
			</div>
		)
	}

}

function connect() {
	api.get('/gauth/create-auth-url/')
		.query({user_id: 5})
		.end(function (err, res) {
			console.log(res)
			window.location.href = res.text
		})
}