import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import './styles/producteditform.css'

export default function EditProductInfoForm({ code, name, description, default_amount, unit, isLoading, onChange, onSubmit}) {
	return (
		<div className='product-edit-form'>
			<CodeAndName onChange={onChange} name={name} code={code}/>
			<Description onChange={onChange} description={description} />
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

function Description({ onChange, description }) {
	return (
			<FormGroup label='Description'>
				<Input
					type='text'
					placeholder='Description of product'
					value={description}
					onChange={(e) => onChange(e, 'description')}
				/>
			</FormGroup>
	)
}
