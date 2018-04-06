import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import './styles/createprocessdialog.css'

export default function DuplicateProcessInputForm({ name, code, number, unit, outputDescription, submitted, onInputChange, onUpdateErrors }) {
	return (
		<div>
			<RenderNameAndAbbreviation onInputChange={onInputChange} name={name} code={code}/>
			<RenderOutputQuantity onInputChange={onInputChange} number={number} unit={unit}/>
			<RenderOutputDescription onInputChange={onInputChange} outputDescription={outputDescription} />
			{submitted && <FormErrors errors={formErrors(name, code, number, unit, outputDescription, onUpdateErrors)}/>}
		</div>
)
}

function RenderNameAndAbbreviation({ onInputChange, name, code }) {
	return (
		<div className="name-abbreviation">
			<FormGroup label="Name" className="name-group">
				<Input
					type="text"
					placeholder="Roasting"
					className="name"
					value={name}
					onChange={(e) => onInputChange(e, "name")}
				/>
			</FormGroup>
			<FormGroup label="Abbreviation" className="abbreviation-group">
				<Input
					type="text"
					placeholder="ROAST"
					className="abbreviation"
					value={code}
					onChange={(e) => onInputChange(e, "code")}
				/>
			</FormGroup>
		</div>
	)
}

function RenderOutputQuantity({ onInputChange, number, unit }) {
	return (
		<FormGroup label="Expected output quantity">
			<div className="output-quantity">
				<Input
					type="number"
					className="number"
					placeholder="5"
					value={number}
					onChange={(e) => onInputChange(e, "number")}
				/>
				<Input
					type="text"
					className="unit"
					placeholder="kilograms"
					value={unit}
					onChange={(e) => onInputChange(e, "unit")}
				/>
			</div>
		</FormGroup>
	)
}

function RenderOutputDescription({ onInputChange, outputDescription }) {
	return (
		<FormGroup label="Output description">
			<Input
				type="text"
				placeholder="Roasted Beans"
				value={outputDescription}
				onChange={(e) => onInputChange(e, "outputDescription")}
			/>
		</FormGroup>
	)
}

function formErrors(name, code, number, unit, outputDescription, onUpdateErrors) {
	const errors = []

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

	if(!outputDescription)
		errors.push("Please make sure you've filled out an output description.")
	
	onUpdateErrors(errors.length)

	return errors
}
