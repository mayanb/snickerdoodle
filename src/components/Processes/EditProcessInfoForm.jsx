import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import './styles/edit-process-info.css'

export default function EditProcessInfoForm({ code, name, output_desc, default_amount, unit, onInputChange, isEditingBasicInfo}) {
	return (
		<div className='edit-process-info'>
			<CodeAndName onInputChange={onInputChange} name={name} code={code}/>
			<OutputDescription onInputChange={onInputChange} output_desc={output_desc} />
			<OutputQuantity onInputChange={onInputChange} default_amount={default_amount} unit={unit}/>
			{/*{isEditingBasicInfo && <FormErrors errors={formErrorsArray}/>}*/}
		</div>
)
}

function CodeAndName({ onInputChange, name, code }) {
	return (
		<div className="name-abbreviation">
			<FormGroup label="Code" className="abbreviation-group">
				<Input
					type="text"
					className="abbreviation"
					value={code}
					onChange={(e) => onInputChange(e, "code")}
				/>
			</FormGroup>
			<FormGroup label="Name" className="name-group">
				<Input
					type="text"
					className="name"
					value={name}
					onChange={(e) => onInputChange(e, "name")}
				/>
			</FormGroup>
		</div>
	)
}

function OutputDescription({ onInputChange, output_desc }) {
	return (
			<FormGroup label="Process Description">
				<Input
					type="text"
					placeholder="Roasted Beans"
					value={output_desc}
					onChange={(e) => onInputChange(e, "outputDescription")}
				/>
			</FormGroup>
	)
}

function OutputQuantity({ onInputChange, default_amount, unit }) {
	return (
		<div className='output-section-container'>
			<div className='output-section-header'>Output</div>
			<FormGroup label="Default Batch Size">
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
		</div>
	)
}
