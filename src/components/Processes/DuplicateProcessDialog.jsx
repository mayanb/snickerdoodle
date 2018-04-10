import React from 'react'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import Textarea from '../Inputs/Textarea'
import './styles/createprocessdialog.css'

export default class DuplicateProcessDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			code: "",
			number: "",
			unit: "",
			outputDescription: "",
			processDescription: "",
			submitted: false
		}

		this.handleDuplicate = this.handleDuplicate.bind(this)
	}

	render() {
		if (!this.props.isOpen) {
			return null
		}

		return (
			<FormDialog
				onToggle={this.props.onToggle}
				onSave={this.handleDuplicate}
				title="Duplicate a process"
				className="create-process-dialog"
			>
				{this.renderNameAndAbbreviation()}
				{this.renderOutputQuantity()}
				{this.renderOutputDescription()}
				{this.renderProcessDescription()}
				{this.renderErrors()}
			</FormDialog>
		)
	}

	renderErrors() {
		if (this.state.submitted) {
			return (
				<FormErrors errors={this.formErrors()} />
			)
		}
	}

	renderNameAndAbbreviation() {
		return (
			<div className="name-abbreviation">
				<FormGroup label="Name" className="name-group">
					<Input
						type="text"
						placeholder="Roasting"
						className="name"
						value={this.state.name}
						onChange={(e) => this.handleInputChange(e, "name")}
					/>
				</FormGroup>
				<FormGroup label="Abbreviation" className="abbreviation-group">
					<Input
						type="text"
						placeholder="ROAST"
						className="abbreviation"
						value={this.state.code}
						onChange={(e) => this.handleInputChange(e, "code")}
					/>
				</FormGroup>
			</div>
		)
	}

	renderOutputQuantity() {
		return (
			<FormGroup label="Expected output quantity">
				<div className="output-quantity">
					<Input
						type="number"
						className="number"
						placeholder="5"
						value={this.state.number}
						onChange={(e) => this.handleInputChange(e, "number")}
					/>
					<Input
						type="text"
						className="unit"
						placeholder="kilograms"
						value={this.state.unit}
						onChange={(e) => this.handleInputChange(e, "unit")}
					/>
				</div>
			</FormGroup>
		)
	}

	renderOutputDescription() {
		return (
			<FormGroup label="Output description">
				<Input
					type="text"
					placeholder="Roasted Beans"
					value={this.state.outputDescription}
					onChange={(e) => this.handleInputChange(e, "outputDescription")}
				/>
			</FormGroup>
		)
	}

	renderProcessDescription() {
		return (
			<FormGroup label="Process description">
					<Textarea
						value={this.state.processDescription}
						onChange={(e) => this.handleInputChange(e, "processDescription")}
					/>
			</FormGroup>
		)
	}

	handleDuplicate() {
		this.setState({ submitted: true })
		if (this.formErrors().length > 0) {
			return
		}

		let newProcess = {
			name: this.state.name,
			code: this.state.code,
			default_amount: this.state.number,
			unit: this.state.unit,
			output_desc: this.state.outputDescription,
			description: this.state.processDescription
		}

		this.props.onDuplicate(newProcess)
		this.props.onToggle()

	}

	handleInputChange(e, key) {
		this.setState({ [key]: e.target.value })
	}

	formErrors() {
		const errors = []
		let { name, code, number, unit, outputDescription, processDescription } = this.state

		if (!name)
			errors.push("Please make sure you've filled out a name.")

		if (!code)
			errors.push("Please make sure you've filled out an abbreviation.")

		if (name && name.length > 20)
			errors.push("Please enter a name with fewer than 20 characters.")

		if (code && code.length > 10)
			errors.push("Please enter an abbreviation with fewer than 10 characters.")

		if (!number || Number.isNaN(number))
			errors.push("Please enter a valid number for expected output quantity.")

		if (!unit)
			errors.push("Please add a unit for the expected output quantity.")

		if(!outputDescription)
			errors.push("Please make sure you've filled out an output description.")

		if(!processDescription)
			errors.push("Please make sure you've filled out an process description.")

		return errors
	}
}