import React from 'react'
import Card from '../Card/Card.jsx'
import ButtonDropdown from '../Card/ButtonDropdown.jsx'
import Button from '../Card/Button.jsx'

export default class CreateProductDropdown extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			expanded: false,
			name: "",
			abbreviation: "",
			description: "", 
			error: false
		}

		this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
	}
	render() {
		return (
			<ButtonDropdown button="Create Product" expanded={this.state.expanded} onToggle={this.handleDropdownToggle}>
				<div className="create-product-dialog">
					{ this.renderInput("name", "Name", "eg. Maya Mountain 2016") }
					{ this.renderInput("abbreviation", "Abbreviation", "eg. MM16") }
					{ this.renderDescription() }
					{ this.renderError() }
					{ this.renderCreateButton() }
				</div>
			</ButtonDropdown>
		)
	}

	renderCreateButton() {
		if (this.props.ui.isCreatingItem)
			return <Button disabled>Creating...</Button>

		return (
			<Button onClick={this.handleCreateProduct.bind(this)}>Create product</Button>
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

	handleDropdownToggle() {
		this.setState({expanded: !this.state.expanded})
	}

	handleCreateProduct() {
		if (!this.handleInputValidation())
			return 

		this.props.onSubmit({code: this.state.abbreviation, name: this.state.name})
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

