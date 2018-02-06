import React from 'react'
import Button from '../Card/Button.jsx'
import './styles/createproductdialog.css'

export default class CreateProductDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			abbreviation: "",
			description: "", 
			error: false,
			too_long: false,
		}
	}

	render() {
		return (
			<div className="create-product-dialog">
				{this.renderInput("name", "Name", "eg. Maya Mountain 2016")}
				{this.renderInput("abbreviation", "Abbreviation", "eg. MM16")}
				{this.renderDescription()}
				{this.renderError()}
				{this.renderTooLongError()}
				{this.renderCreateButton()}
			</div>
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

	renderTooLongError() {
		if (this.state.too_long) {
			return <span className="create-product-error">The product name must be under 30 characters and the abbreviation under 10.</span>
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
		if (this.state.error || this.state.too_long) {
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

	handleCreateProduct() {
		if (!this.handleInputValidation())
			return 
		this.props.onSubmit({code: this.state.abbreviation, name: this.state.name})
	}

	handleInputValidation() {
		let {name, abbreviation} = this.state
		if(!name || name.length === 0 || !abbreviation || abbreviation.length === 0) {
			this.setState({error: true})
			return false
		}
		if (name.length > 30 || abbreviation.length > 10) {
			// this.setState({error: true})
			this.setState({too_long: true})
			return false
		}
		this.setState({error: false})
		return true
	}


}

