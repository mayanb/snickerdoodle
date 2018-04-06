import React from 'react'
import FormDialog from '../FormDialog/FormDialog'
import './styles/createprocessdialog.css'
import DuplicateProcessInputForm from './DuplicateProcessInputForm'

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
			submitted: false,
			hasErrors: true,
		}

		this.handleDuplicate = this.handleDuplicate.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleUpdateErrors = this.handleUpdateErrors.bind(this)
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
				<DuplicateProcessInputForm
					{...this.state}
					onInputChange={this.handleInputChange}
					onUpdateErrors={this.handleUpdateErrors}
				/>
			</FormDialog>
		)
	}

	handleDuplicate() {
		this.setState({ submitted: true })
		if (this.hasErrors) {
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
	
	handleUpdateErrors(numErrors) {
		console.log('hasErrors: ', numErrors > 0)
		this.setState({ hasErrors: numErrors > 0 })
	}
}