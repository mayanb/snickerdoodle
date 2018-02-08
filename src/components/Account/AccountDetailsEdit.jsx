import React from 'react'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import { EMAIL_REGEX } from '../../utilities/constants'
import Input from '../Inputs/Input'

export default class AccountDetailsEdit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.initialValue || "",
			submitted: false
		}

		this.onSubmit = this.onSubmit.bind(this)
	}

	renderValidation() {
		if (this.state.submitted)
			return <FormErrors errors={this.formErrors()} />
	}

	render() {
		let props = this.props
		let display = props.keyDisplay.toLowerCase()
		return (
			<FormDialog
				onToggle={props.onCancel}
				onSave={this.onSubmit}
				title={`Change ${display}`}
			>
				<FormGroup label={`New ${display}`}>
					<Input
						placeholder="john@smith.com"
						value={this.state.value}
						onChange={(e) => this.setState({ value: e.target.value })}
					/>
				</FormGroup>
				{this.renderValidation()}
			</FormDialog>
		)
	}

	onSubmit() {
		this.setState({ submitted: true })
		if (this.formErrors().length === 0)
			this.props.onSubmit(this.state.value)
	}

	formErrors() {
		const errors = []

		if (this.props.keyword === 'email' && !EMAIL_REGEX.test(this.state.value))
			errors.push('Please enter a valid email address.')
		return errors
	}
}