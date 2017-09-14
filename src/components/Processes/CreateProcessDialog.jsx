import React from 'react'
import Dialog from '../Card/Dialog.jsx'

export default class CreateProcessDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			number: "",
			unit: "", 
			outputDescription: ""
		}
	}

	render() {
		return (
			<Dialog>
				<h1>Your process is almost ready...</h1>
				<span>Fill out the following details to help your team understand this new process.</span>
				{ this.renderRule() }
				{ this.renderQuantityInput() }
				{ this.renderOutputDescription() }
				{ this.renderDescription() }
			</Dialog>
		)
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
					onChange={(e)=> this.handleInputChange(e, "unit")}/>
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
			<div className="create-product-description">
				<label>Process description</label>
				<textarea placeholder="hello"/>
			</div>
		)
	}

	handleInputChange(e, key) {
		this.setState({[key]: e.target.value})
	}


}