import React from 'react'
import FormDialog from '../FormDialog/FormDialog'
import './styles/createprocessdialog.css'
import CreateOrDuplicateProcessInputForm from './CreateOrDuplicateProcessInputForm'

export default class CreateOrDuplicateProcessDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			icon: "default.png",
			name: "",
			code: "",
			number: "",
			unit: "",
			outputDescription: "",
			category: "wip",
			submitted: false,
			formErrorsArray: [],
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	render() {
		const { isOpen, onToggle, title, className, submitButtonText } = this.props

		if (!isOpen) {
			return null
		}

		return (
			<FormDialog
				onToggle={onToggle}
				onSave={this.handleSubmit}
				title={title}
				className={className}
				submitButtonText={submitButtonText}
			>
				<CreateOrDuplicateProcessInputForm {...this.state} onInputChange={this.handleInputChange} />
			</FormDialog>
		)
	}

	handleSubmit() {
		const { onSubmit, onToggle } = this.props

		this.setState({ submitted: true })
		if (this.formErrors().length > 0) {
			return
		}

		let newProcess = {
			icon: this.state.icon,
			name: this.state.name,
			code: this.state.code,
			default_amount: this.state.number,
			unit: this.state.unit,
			output_desc: this.state.outputDescription,
			category: this.state.category,
		}

		onSubmit(newProcess)
		onToggle()

	}

	handleInputChange(val, key) {
		this.setState({ [key]: val })
	}

	formErrors() {
		const errors = []
		let { name, code, number, unit, outputDescription, category } = this.state

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

		if (!outputDescription)
			errors.push("Please make sure you've filled out an output description.")

		if (!category)
			errors.push("Please make sure you've selected a category")
		this.setState({ formErrorsArray: errors })
		return errors
	}
}