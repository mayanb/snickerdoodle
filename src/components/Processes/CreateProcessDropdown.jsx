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
			error: false,
			isDialogOpen: false,
		}

		this.handleCreate = this.handleCreate.bind(this)
		this.handleCreateProcess = this.handleCreateProcess.bind(this)
		this.handleToggleDialog = this.handleToggleDialog.bind(this)

	}
	
	render() {
		return (
			<div>
				<div className="create-product-dialog">
					{this.renderInput("name", "Name", "eg. Roast")}
					{this.renderInput("abbreviation", "Abbreviation", "eg. R")}
					{this.renderError()}
					<Button onClick={this.handleCreateProcess}>Create Process</Button>
				</div>
				{this.renderDialog()}
			</div>
		)
	}

	renderError() {
		if (this.state.error) {
			return <span className="create-process-error">Please make sure you've filled out a name and abbreviation.</span>
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
		return (
			<CreateProcessDialog 
				name={this.state.name} 
				code={this.state.abbreviation} 
				isOpen={this.state.isDialogOpen} 
				onToggle={this.handleToggleDialog}
				onCreate={this.handleCreate}
			/>
		)
	}

	handleToggleDialog() {
		this.setState({isDialogOpen: !this.state.isDialogOpen})
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



	// this is the create button in the dropdown
	handleCreateProcess() {
		if(!this.handleInputValidation())
			return 

		this.setState({isDialogOpen: true})
	}


	// this is what's finally called from the dialog
	handleCreate(newProcess) {
		this.props.onSubmit(newProcess)
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

