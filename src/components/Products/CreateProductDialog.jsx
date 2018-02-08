import React from 'react'
import FormDialog from '../FormDialog/FormDialog'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Textarea from '../Inputs/Textarea'
import Input from '../Inputs/Input'
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

		this.handleCreateProduct = this.handleCreateProduct.bind(this)
	}

	render() {
		if (!this.props.isOpen) {
			return null
		}

		return (
			<FormDialog
				onToggle={this.props.onToggle}
				onSave={this.handleCreateProduct}
				title="Create a product"
			>
				<div className="create-product-dialog">
					{this.renderName()}
					{this.renderAbbreviation()}
					{this.renderDescription()}
					{this.renderErrors()}
				</div>
			</FormDialog>
		)
	}

	renderErrors() {
		if (this.state.submitted) {
			return <FormErrors errors={this.formErrors()} />
		}
	}

	renderName() {
		return (
			<FormGroup label="Name">
				<Input
					type="text"
					placeholder="e.g. Maya Mountain 2016"
					value={this.state.name}
					onChange={(e) => this.handleInputChange(e, 'name')}
				/>
			</FormGroup>
		)
	}

	renderAbbreviation() {
		return (
			<FormGroup label="Abbreviation">
				<Input
					type="text"
					placeholder="e.g. MM16"
					value={this.state.abbreviation}
					onChange={(e) => this.handleInputChange(e, 'abbreviation')}
				/>
			</FormGroup>
		)
	}

	renderDescription() {
		return (
			<FormGroup label="Description">
					<Textarea
						placeholder="max 50 characters"
						value={this.state.description}
						onChange={(e) => this.handleInputChange(e, "description")}
					/>
			</FormGroup>
		)
	}

	handleInputChange(e, key) {
		this.setState({ [key]: e.target.value })
	}

	handleCreateProduct() {
		this.setState({ submitted: true })
		if (this.formErrors().length > 0)
			return

		this.props.onCreate({
			code: this.state.abbreviation,
			name: this.state.name,
			description: this.state.name
		})
	}

	formErrors() {
		const errors = [];
		let { name, abbreviation, description } = this.state
		if (!name || !abbreviation)
			errors.push("Please make sure you've filled out a name and abbreviation.")

		if (name.length > 30 || abbreviation.length > 10)
			errors.push("The product name must be under 30 characters and the abbreviation under 10.")

		if (description.length > 50)
			errors.push("The product description must be under 50 characters.")

		return errors;
	}
}

