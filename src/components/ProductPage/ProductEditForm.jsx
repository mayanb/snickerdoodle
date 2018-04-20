import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import './styles/producteditform.css'

export default function EditProductInfoForm({ code, name, output_desc, default_amount, unit, isLoading, onChange, onSubmit}) {
	return (
		<div className='product-edit-form'>
			<CodeAndName onChange={onChange} name={name} code={code}/>
			<OutputDescription onChange={onChange} output_desc={output_desc} />
			<FormGroup>
				<Button wide onClick={onSubmit} isLoading={isLoading}>Save changes</Button>
			</FormGroup>
		</div>
)
}

function CodeAndName({ onChange, name, code }) {
	return (
		<div className='name-abbreviation'>
			<FormGroup label='Code' className='abbreviation-group'>
				<Input
					type='text'
					className='abbreviation'
					value={code}
					onChange={(e) => onChange(e, 'code')}
				/>
			</FormGroup>
			<FormGroup label='Name' className='name-group'>
				<Input
					type='text'
					className='name'
					value={name}
					onChange={(e) => onChange(e, 'name')}
				/>
			</FormGroup>
		</div>
	)
}

function OutputDescription({ onChange, output_desc }) {
	return (
			<FormGroup label='Description'>
				<Input
					type='text'
					placeholder='Roasted Beans'
					value={output_desc}
					onChange={(e) => onChange(e, 'output_desc')}
				/>
			</FormGroup>
	)
}
