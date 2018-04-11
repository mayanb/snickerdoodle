import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import './styles/createprocessdialog.css'

export default function CreateOrDuplicateProcessInputForm({ name, code, number, unit, outputDescription, submitted, onInputChange, formErrorsArray }) {
	return (
		<div>
			<NameAndAbbreviation onInputChange={onInputChange} name={name} code={code}/>
			<OutputQuantity onInputChange={onInputChange} number={number} unit={unit}/>
			<OutputDescription onInputChange={onInputChange} outputDescription={outputDescription} />
			{submitted && <FormErrors errors={formErrorsArray}/>}
		</div>
)
}

function NameAndAbbreviation({ onInputChange, name, code }) {
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

function OutputQuantity({ onInputChange, number, unit }) {
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

function OutputDescription({ onInputChange, outputDescription }) {
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
