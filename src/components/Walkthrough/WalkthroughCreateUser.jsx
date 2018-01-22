import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import { connect } from 'react-redux'
import WalkthroughHint from './WalkthroughHint'
import './styles/walkthroughcreateuser.css'
//import './styles/walkthroughcreateteam.css'
import * as memberActions from '../TeamSettings/MemberActions'
import * as userActions from '../AccountMenu/UserActions'
import * as walkthroughActions from './WalkthroughActions'
import Card from '../Card/Card'
import {Redirect} from 'react-router'



export class WalkthroughCreateUserAndTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				first_name: "",
				last_name: "",
				username: "",
				email: "",
				password: "",
			},
			team: "",
			page: 0,
			shouldRedirect: false,
		}
	}

	render() {
		// you have created a team, should go back home
		if (this.state.shouldRedirect) {
			return <Redirect to="/"/>
		}
		
		if (this.state.page === 0) {
			return <WalkthroughCreateUser onSubmit={this.handleSubmitUser.bind(this)} />
		}
		return <WalkthroughCreateTeam onSubmit={this.handleSubmitTeam.bind(this)} />
	}

	handleSubmitUser(user) {
		this.setState({ page: 1, user: user })
	}

	handleSubmitTeam(team) {
		// create the team
		this.setState({ team: team }, () => {
			this.props.dispatch(walkthroughActions.postCreateTeam(this.state.team))
				.then((res) => {

					// create the user & login
					const newTeamId = res.item.id
					const newUser = Object.assign({}, this.state.user, { team: newTeamId })
					this.props.dispatch(memberActions.postCreateMember(newUser, () => {}))
						.then(this.handleLogin.bind(this))
				})
				.catch((err) => console.log("oops"))
		})
	}

	handleLogin() {
		let credentials = {
			username: this.state.user.username.toLowerCase() + '_' + this.state.team.toLowerCase(), 
			password: this.state.user.password
		}
		this.props.dispatch(userActions.postRequestLogin(credentials, ()=> this.setState({shouldRedirect: true})))
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {}
}

export default connect(mapStateToProps)(WalkthroughCreateUserAndTeam)

class WalkthroughCreateTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = { team: "" }
	}

	render() {
		return (
				<div className="walkthrough-create-team">
					<Card>
						<div className="walkthrough-form walkthrough-container">
							<span className="walkthrough-header">What's your team's name?</span>
							<WalkthroughInput placeholder="teamrocket" onChange={(t) => this.setState({ team: t })} />
							<WalkthroughButton title="I made a team" onClick={() => this.props.onSubmit(this.state.team)} />
						</div>
						<WalkthroughHint>Teams are groups of people who work on the same production line together.</WalkthroughHint>
					</Card>
				</div>
		)
	}
}

function WalkthroughCreateUser(props) {
	return (
		<div className="walkthrough-create-user">
			<Card>
				<Information />
				<CreateUserForm onSubmit={props.onSubmit} />
			</Card>
		</div>
	)
}

function Information(props) {
	return (
		<div className="walkthrough-intro-info">
			<div>
				<h3>Know who did what, when, and how</h3>
				<span>Understand what’s going on at your factory at all times. Use this to save time during analyses, tracebacks, and more.</span>
			</div>
			<div>
				<h3>Skip the status meeting</h3>
				<span>Understand what’s going on at your factory at all times. Use this to save time during analyses, and more. </span>
			</div>
			<div>
				<h3>A tool your entire team can use</h3>
				<span>Polymer is easy enough for everyone to use, and powerful enough to handle your most complex workflows.</span>
			</div>
		</div>
	)
}

class CreateUserForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			first_name: "",
			last_name: "",
			username: "",
			email: "",
			password: ""
		}
	}

	render() {
		let { first_name, last_name, username, email, password } = this.state
		return (
			<div className="walkthrough-form walkthrough-container">
				<div className="next-to">
					<WalkthroughInput value={first_name} title="First name" placeholder="Jane"
					                  onChange={(v) => this.handleChange('first_name', v)} />
					<WalkthroughInput value={last_name} title="Last name" placeholder="Doe"
					                  onChange={(v) => this.handleChange('last_name', v)} />
				</div>
				<WalkthroughInput value={username} title="Username" placeholder="janedoe"
				                  onChange={(v) => this.handleChange('username', v)} />
				<WalkthroughInput value={email} title="Email" placeholder="janedoe@example.com"
				                  onChange={(v) => this.handleChange('email', v)} />
				<WalkthroughInput value={password} title="Password" type="password" placeholder="Choose a password"
				                  onChange={(v) => this.handleChange('password', v)} />
				<WalkthroughButton title="Continue" onClick={() => this.props.onSubmit(this.state)} />
			</div>
		)
	}

	handleChange(key, value) {
		this.setState({ [key]: value })
	}
}