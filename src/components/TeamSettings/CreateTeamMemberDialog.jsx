import React from 'react'
import Select from '../Inputs/Select'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
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
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(e, key) {
		this.setState({ [key]: e.target.value })
	}

	handleSubmit() {
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
			</FormDialog>
		)
	}
}