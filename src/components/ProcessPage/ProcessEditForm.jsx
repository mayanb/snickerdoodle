import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import './styles/processeditform.css'
import IconPicker from './IconPicker'

export default function EditProcessInfoForm({ icon, code, name, output_desc, default_amount, unit, isLoading, onChange, onSubmit}) {
	return (
		<div className='edit-process-info'>
			<IconPicker onChange={onChange} icon={icon} />
			<CodeAndName onChange={onChange} name={name} code={code}/>
			<OutputDescription onChange={onChange} output_desc={output_desc} />
			<OutputQuantity onChange={onChange} default_amount={default_amount} unit={unit}/>
			<FormGroup>
				<Button wide onClick={onSubmit} isLoading={isLoading}>Save changes</Button>
			</FormGroup>
		</div>
	)
}

function CodeAndName({ onChange, name, code }) {
	return (
		<div className="name-abbreviation">
			<FormGroup label="Code" className="abbreviation-group">
				<Input
					type="text"
					className="abbreviation"
					value={code}
					onChange={(e) => onChange(e.target.value, "code")}
				/>
			</FormGroup>
			<FormGroup label="Name" className="name-group">
				<Input
					type="text"
					className="name"
					value={name}
					onChange={(e) => onChange(e.target.value, "name")}
				/>
			</FormGroup>
		</div>
	)
}

function OutputDescription({ onChange, output_desc }) {
	return (
			<FormGroup label="Description">
				<Input
					type="text"
					placeholder="Roasted Beans"
					value={output_desc}
					onChange={(e) => onChange(e.target.value, "output_desc")}
				/>
			</FormGroup>
	)
}

function OutputQuantity({ onChange, default_amount, unit }) {
	return (
		<FormGroup label="Default Batch Size">
			<div className="output-quantity">
				<Input
					type="number"
					className="number"
					placeholder="5"
					value={default_amount}
					onChange={(e) => onChange(e.target.value, "default_amount")}
				/>
				<Input
					type="text"
					className="unit"
					placeholder="kilograms"
					value={unit}
					onChange={(e) => onChange(e.target.value, "unit")}
				/>
			</div>
		</FormGroup>
	)
}
