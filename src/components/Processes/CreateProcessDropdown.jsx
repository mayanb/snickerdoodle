import React from 'react'
import Button from '../Card/Button.jsx'

export default class NameProcessDropdown extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			abbreviation: "",
			errorMessage: false,
		}

		this.handleNameProcess = this.handleNameProcess.bind(this)

	}
	
	render() {
		return (
			<div>
				<div className="create-product-dialog">
					{this.renderInput("name", "Name", "eg. Roast")}
					{this.renderInput("abbreviation", "Abbreviation", "eg. R")}
					{this.renderError()}
					<Button onClick={this.handleNameProcess}>Create Process</Button>
				</div>
			</div>
		)
	}

	renderError() {
		if (this.state.errorMessage) {
			return <span className="create-product-error">{this.state.errorMessage}</span>
		}
		return null;
	}

	renderInput(key, label, placeholder,) {
		return (
			<div className="create-product-input">
				<label>{label}</label>
				<input type="text" value={this.state[key]} placeholder={placeholder} onChange={(e) => this.handleInputChange(e, key)} />
			</div>
		)
	}


	handleInputChange(e, key) {
		this.setState({[key]: e.target.value})
		if (this.state.errorMessage) {
			this.handleInputValidation()
		}
	}

	renderDescription() {
		return (
			<div className="create-product-description">
				<label>Description (optional)</label>
				<textarea placeholder="max 50 characters"/> 
			</div>
		)
	}

	// this is the create button in the dropdown
	handleNameProcess() {
		if(!this.handleInputValidation())
			return

		this.props.onSubmit({name: this.state.name, abbreviation: this.state.abbreviation})
	}


	handleInputValidation() {
		let {name, abbreviation} = this.state
		if(!name || name.length == 0 || !abbreviation || abbreviation.length == 0) {
			this.setState({errorMessage: "Please make sure you've filled out a name and abbreviation."})
			return false
		}
		if (name.length > 20) {
			this.setState({errorMessage: "Please enter a name with fewer than 20 characters."})
			return false
		}
		if (abbreviation.length > 10) {
			this.setState({errorMessage: "Please enter an abbreviation with fewer than 10 characters."})
			return false
		}
		this.setState({errorMessage: false})
		return true

	}


}

