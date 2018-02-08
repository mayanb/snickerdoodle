import React from 'react'
import Select from '../Inputs/Select'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import { EMAIL_REGEX, USERNAME_REGEX } from '../../utilities/constants'
import './styles/createteammember.css'

let account_types = [
	{ value: 'a', label: 'Administrator' },
	{ value: 'w', label: 'Regular' }
]

export default class CreateTeamMemberDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			username: "",
			password: "",
			account_type: "",
			submitted: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(e, key) {
		this.setState({ [key]: e.target.value })
	}

	handleSubmit() {
		this.setState({ submitted: true })
		if (this.formErrors().length > 0)
			return
		this.props.onSubmit(this.state, () =>
			this.props.onCancel()
		)
	}

	render() {
		if (!this.props.isOpen)
			return null;

		return (
			<FormDialog
				onToggle={this.props.onCancel}
				title="Add a team member"
				onSave={this.handleSubmit}
				className="create-team-member"
			>
				{this.renderForm()}
				{this.renderErrors()}
			</FormDialog>
		)
	}

	renderForm() {
		return (
			<div>
				<div className="first-and-last-name">
					<FormGroup label="First Name" className="first-name-group">
						<Input
							placeholder="Jane"
							value={this.state.first_name}
							onChange={(e) => this.handleInputChange(e, "first_name")}
						/>
					</FormGroup>
					<FormGroup label="Last Name" className="last-name-group">
						<Input
							placeholder="Doe"
							value={this.state.last_name}
							onChange={(e) => this.handleInputChange(e, "last_name")}
						/>
					</FormGroup>
				</div>
				<FormGroup label="Email">
					<Input
						className="email"
						placeholder="jane@example.com"
						value={this.state.email}
						onChange={(e) => this.handleInputChange(e, "email")}
					/>
				</FormGroup>
				<FormGroup label="Username">
					<Input
						className="username"
						placeholder="letters & numbers only"
						value={this.state.username}
						onChange={(e) => this.handleInputChange(e, "username")}
					/>
				</FormGroup>
				<FormGroup label="Password">
					<Input
						type="password"
						placeholder="***"
						value={this.state.password}
						onChange={(e) => this.handleInputChange(e, "password")}
					/>
				</FormGroup>
				<FormGroup label="Account type">
					<Select
						value={this.state.account_type}
						searchable={false}
						clearable={false}
						options={account_types}
						onChange={(e) => this.handleInputChange({ target: { value: e.value } }, "account_type")}
						placeholder="Choose an account type"
					/>
				</FormGroup>
			</div>
		)
	}

	renderErrors() {
		if (this.state.submitted) {
			return (
				<FormErrors errors={this.formErrors()} />
			)
		}
	}

	formErrors() {
		const errors = []
		let { first_name, last_name, email, username, password, account_type } = this.state

		if (!first_name || !last_name)
			errors.push("Please make sure you've entered a first and last name.")

		if((first_name && first_name.length > 30) || (last_name && last_name.length > 30))
			errors.push("Please enter first and last names with fewer than 30 characters")

		if (!email)
			errors.push("Please make sure you've entered an email address.")

		if (email && !EMAIL_REGEX.test(email))
			errors.push('Please enter a valid email address.')

		if (!username)
			errors.push("Please make sure you've entered a username.")

		if (username && !USERNAME_REGEX.test(username))
			errors.push('Please enter a username containing only letters and numbers.')

		if (username && username.length > 99)
			//Django limits username to 150 characters. We may need 50 for the team name and 1 for the underscore
			errors.push('Please enter a username with fewer than 99 characters')

		if (!password)
			errors.push("Please make sure you've entered a password.")

		if (!account_type)
			errors.push("Please make sure you've selected an account type.")

		return errors
	}
}