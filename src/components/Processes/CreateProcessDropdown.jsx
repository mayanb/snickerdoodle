import React from 'react'
import Card from '../Card/Card.jsx'
import ButtonDropdown from '../Card/ButtonDropdown.jsx'
import Button from '../Card/Button.jsx'
import CreateProcessDialog from './CreateProcessDialog'

export default class CreateProcessDropdown extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			abbreviation: "",
			description: "", 
			error: false,
			dialog: true
		}
	}
	render() {
		return (
			<div>
			<ButtonDropdown button="Create Process">
				<div className="create-product-dialog">
					{ this.renderInput("name", "Name", "eg. Roast") }
					{ this.renderInput("abbreviation", "Abbreviation", "eg. R") }
					{ this.renderError() }
					<Button onClick={this.handleCreateProcess.bind(this)}>Create Process</Button>
				</div>
			</ButtonDropdown>
			{ this.renderDialog() }
			</div>
		)
	}

	renderError() {
		if (this.state.error) {
			return <span className="create-product-error">Please make sure you've filled out a name and abbreviation.</span>
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

	renderDialog() {
		if(!this.state.dialog) 
			return null

		return <CreateProcessDialog {...this.state} />
	}

	handleInputChange(e, key) {
		this.setState({[key]: e.target.value})
		if (this.state.error) {
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

	handleCreateProcess() {
		if(!this.handleInputValidation())
			return 

		this.setState({dialog: true, expanded: false})
	}

	handleInputValidation() {
		let {name, abbreviation} = this.state
		if(!name || name.length == 0 || !abbreviation || abbreviation.length == 0) {
			this.setState({error: true})
			return false
		}
		if (name.length > 20 || abbreviation.length > 10) {
			this.setState({error: true})
			return false
		}
		this.setState({error: false})
		return true

	}


}

