import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import './styles/createprocessdialog.css'

export default class CreateProcessDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
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
			<Dialog onToggle={this.props.onToggle}>
				<h1>Your process is almost ready...</h1>
				<span>Fill out the following details to help your team understand this new process.</span>
				{ this.renderRule() }
				{ this.renderQuantityInput() }
				{ this.renderOutputDescription() }
				{ this.renderDescription() }
				{ this.renderError() }
				{ this.renderButtons() }
			</Dialog>
		)
	}

	renderError() {
		if (this.state.error) {
			return <span className="create-product-error">Please make sure you've filled out a name and abbreviation.</span>
		}
		return null;
	}

	renderRule() {
		return (
			<div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
		)
	}

	renderQuantityInput() {
		return (
			<div className="create-process-input">
				<label>Expected output quantitiy</label>
				<input 
					className="number" 
					placeholder="5"
					value={this.state.number} 
					onChange={(e)=> this.handleInputChange(e, "number")}
				/>
				<input 
					className="unit"
					placeholder="kilograms"  
					value={this.state.unit} 
					onChange={(e)=> this.handleInputChange(e, "unit")}
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
					onChange={(e)=> this.handleInputChange(e, "outputDescription")}/>
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

	renderButtons() {
		return (
			<div className="create-process-buttons">
				<Button secondary onClick={this.props.onToggle}>Cancel</Button>
				<Button onClick={this.handleCreate}>Create process</Button>
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
		this.setState({[key]: e.target.value})
		if (this.state.error) {
			this.handleInputValidation()
		}
	}

	handleInputValidation() {
		let {number} = this.state
		let {name, code} = this.props

		if(!number || number.length === 0 || Number.isNaN(number)) {
			this.setState({error: true})
			return false
		}

		if (!code || code.length === 0 || code.length > 10) {
			this.setState({error: true})
			return false
		}

		if(!name || name.length > 20) {
			this.setState({error: true})
			return false
		}

		this.setState({error: true})
		return true
	}


}