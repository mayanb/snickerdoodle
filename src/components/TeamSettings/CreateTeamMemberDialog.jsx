import React from 'react'
import uuid from 'uuid/v4'
import Select from '../Inputs/Select'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import { EMAIL_REGEX } from '../../utilities/constants'
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

		let json = {
			...this.state,
			username: uuid(),
			password: 'InitialPassword1',
			invited: true,
		}
		console.log(json)
		this.props.onSubmit(json, () =>
			this.props.onCancel()
		)
	}

	render() {
		if (!this.props.isOpen)
			return null;

		const { onCancel, isLoadingNewTeamMember } = this.props
		return (
			<FormDialog
				onToggle={onCancel}
				title="Add a team member"
				onSave={this.handleSubmit}
				className="create-team-member"
				isLoading={isLoadingNewTeamMember}
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
		let { first_name, last_name, email, account_type } = this.state

		if (!first_name || !last_name)
			errors.push("Please make sure you've entered a first and last name.")

		if((first_name && first_name.length > 30) || (last_name && last_name.length > 30))
			errors.push("Please enter first and last names with fewer than 30 characters")

		if (!email)
			errors.push("Please make sure you've entered an email address.")

		if (email && !EMAIL_REGEX.test(email))
			errors.push('Please enter a valid email address.')

		if (!account_type)
			errors.push("Please make sure you've selected an account type.")

		return errors
	}
}