import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import './styles/createprocessdialog.css'

export default function EditProcessInfoForm({ code, name, output_desc, default_amount, unit, onInputChange, isEditingBasicInfo}) {
	return (
		<div>
			<RenderNameAndAbbreviation onInputChange={onInputChange} name={name} code={code}/>
			<RenderOutputQuantity onInputChange={onInputChange} default_amount={default_amount} unit={unit}/>
			<RenderOutputDescription onInputChange={onInputChange} output_desc={output_desc} />
			{/*{isEditingBasicInfo && <FormErrors errors={formErrorsArray}/>}*/}
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

function RenderOutputQuantity({ onInputChange, default_amount, unit }) {
	return (
		<FormGroup label="Expected output quantity">
			<div className="output-quantity">
				<Input
					type="number"
					className="number"
					placeholder="5"
					value={default_amount}
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

function RenderOutputDescription({ onInputChange, output_desc }) {
	return (
		<FormGroup label="Output description">
			<Input
				type="text"
				placeholder="Roasted Beans"
				value={output_desc}
				onChange={(e) => onInputChange(e, "outputDescription")}
			/>
		</FormGroup>
	)
}
