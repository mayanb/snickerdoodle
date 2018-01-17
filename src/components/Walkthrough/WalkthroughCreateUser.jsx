import React from 'react'
import Card from '../Card/Card'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import WalkthroughHint from './WalkthroughHint'
import './styles/walkthroughcreateuser.css'
import './styles/walkthroughcreateteam.css'


export default class WalkthroughCreateUserAndTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			first_name: "",
			last_name: "",
			username: "",
			email: "",
			password: "",
			team: "",
			page: 0,
		}
	}

	render() {
		if (this.state.page === 0) {
			return <WalkthroughCreateUser onSubmit={this.handleSubmitUser.bind(this)} />
		} 
		return <WalkthroughCreateTeam />
	}

	handleSubmitUser(data) {
		this.setState({page: 1, ...data})
	}

	handleSubmitTeam(data) {
		// let hardSubmit = () => this.actions.dispatch(actions.dispatch(createUserAndTeam(this.state)))
		this.setState(data) //, hardSubmit)
	}
}

class WalkthroughCreateTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {team: ""}
	}

	render() {
		return (
			<div className="walkthrough-create-team">
				<Card nopadding >
					<div className="walkthrough-form">
						<span className="walkthrough-header">What's your team's name?</span>
						<WalkthroughInput placeholder="teamrocket" onChange={(t) => this.setState({team: t})} />
						<WalkthroughButton title="Continue" onClick={() => this.props.onSubmit(this.state)}/>
						<WalkthroughHint>Teams are groups of people who work on the same production line together.</WalkthroughHint>
					</div>
				</Card>
			</div>
		)
	}
}

function WalkthroughCreateUser(props) {
	return (
		<Card nopadding>
			<div className="walkthrough-create-user">
				<Information />
				<CreateUserForm onSubmit={props.onSubmit}/>
			</div>
		</Card>
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
		let {first_name, last_name, username, email, password } = this.state
		return (
			<div className="walkthrough-form">
				<div className="next-to">
					<WalkthroughInput value={first_name} title="First name" placeholder="Jane" onChange={(v) => this.handleChange('first_name', v)} />
					<WalkthroughInput value={last_name} title="Last name" placeholder="Doe" onChange={(v) => this.handleChange('last_name', v)}/>
				</div>
				<WalkthroughInput value={username} title="Username" placeholder="janedoe"onChange={(v) => this.handleChange('username', v)} />
				<WalkthroughInput value={email} title="Email" placeholder="janedoe@example.com"onChange={(v) => this.handleChange('email', v)} />
				<WalkthroughInput value={password} title="Password" type="password" placeholder="Choose a password" onChange={(v) => this.handleChange('password', v)} />
				<WalkthroughButton title="Continue" onClick={() => this.props.onSubmit(this.state)}/>
			</div>
		)
	}

	handleChange(key, value) {
		this.setState({[key]: value})
		this.validate()
	}
}