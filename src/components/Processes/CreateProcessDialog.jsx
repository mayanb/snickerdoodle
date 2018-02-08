import React from 'react'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import Textarea from '../Inputs/Textarea'
import './styles/createprocessdialog.css'

export default class CreateProcessDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			abbreviation: "",
			number: "",
			unit: "",
			outputDescription: "",
			processDescription: "",
			error: false,
		}

		this.handleCreate = this.handleCreate.bind(this)
	}

	render() {
		if (!this.props.isOpen) {
			return null
		}

		return (
			<FormDialog
				onToggle={this.props.onToggle}
				onSave={this.handleCreate}
				title="Create a process"
				className="create-process-dialog"
			>
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
							value={this.state.abbreviation}
							onChange={(e) => this.handleInputChange(e, "abbreviation")}
						/>
					</FormGroup>
				</div>
				<FormGroup label="Expected output quantity">
					<div className="output-quantity">
						<Input
							className="number"
							placeholder="5"
							value={this.state.number}
							onChange={(e) => this.handleInputChange(e, "number")}
						/>
						<Input
							className="unit"
							placeholder="kilograms"
							value={this.state.unit}
							onChange={(e) => this.handleInputChange(e, "unit")}
						/>
					</div>
				</FormGroup>
				<FormGroup label="Output description">
					<Input
						placeholder="Roasted Beans"
						value={this.state.outputDescription}
						onChange={(e) => this.handleInputChange(e, "outputDescription")}
					/>
				</FormGroup>
				<FormGroup label="Process description">

					<Textarea
						value={this.state.processDescription}
						onChange={(e) => this.handleInputChange(e, "processDescription")}
					/>
				</FormGroup>

				{this.renderError()}
			</FormDialog>
		)
	}

	renderError() {
		if (this.state.error) {
			return <span className="create-product-error">Please make sure you've filled out a name and abbreviation.</span>
		}
		return null;
	}

	renderQuantityInput() {
		return (
			<div className="create-process-input">
				<label>Expected output quantitiy</label>
				<input
					className="number"
					placeholder="5"
					value={this.state.number}
					onChange={(e) => this.handleInputChange(e, "number")}
				/>
				<input
					className="unit"
					placeholder="kilograms"
					value={this.state.unit}
					onChange={(e) => this.handleInputChange(e, "unit")}
				/>
			</div>
		)
	}

	renderOutputDescription() {
		return (
			<div className="create-process-input">
				<label>Output description</label>
				<input
					className="outputDescription"
					placeholder="eg. Roasted beans"
					value={this.state.outputDescription}
					onChange={(e) => this.handleInputChange(e, "outputDescription")} />
			</div>
		)
	}

	renderDescription() {
		return (
			<div className="create-process-description">
				<label>Process description</label>
				<textarea placeholder="Optional"
				          value={this.state.processDescription}
				          onChange={(e) => this.handleInputChange(e, "processDescription")} />
			</div>
		)
	}

	handleCreate() {
		if (!this.handleInputValidation()) {
			return
		}

		let newProcess = {
			name: this.props.name,
			code: this.props.code,
			default_amount: this.state.number,
			unit: this.state.unit,
			output_desc: this.state.outputDescription,
			description: this.state.processDescription
		}

		this.props.onCreate(newProcess)
		this.props.onToggle()

	}

	handleInputChange(e, key) {
		this.setState({ [key]: e.target.value })
		if (this.state.error) {
			this.handleInputValidation()
		}
	}

	handleInputValidation() {
		let { number } = this.state
		let { name, code } = this.props

		if (!number || number.length === 0 || Number.isNaN(number)) {
			this.setState({ error: true })
			return false
		}

		if (!code || code.length === 0 || code.length > 10) {
			this.setState({ error: true })
			return false
		}

		if (!name || name.length > 20) {
			this.setState({ error: true })
			return false
		}

		this.setState({ error: true })
		return true
	}


}