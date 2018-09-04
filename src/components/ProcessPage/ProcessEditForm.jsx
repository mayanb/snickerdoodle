import React from 'react'
import { Select } from 'antd'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import './styles/processeditform.css'
import IconPicker from '../IconPicker/IconPicker'
import ProcessCategoryPicker from '../Processes/ProcessCategoryPicker'

export default function EditProcessInfoForm({ icon, code, name, output_desc, default_amount, unit, category, tags, tagNames, isLoading, onChange, onSubmit}) {
	return (
		<div className='edit-process-info'>
			<CodeAndName onChange={onChange} icon={icon} code={code} name={name} />
			<OutputDescription onChange={onChange} output_desc={output_desc} />
			<OutputQuantity onChange={onChange} default_amount={default_amount} unit={unit}/>
			<Category onChange={onChange} category={category} />
			<TagSelect onChange={onChange} tags={tagNames ? tagNames : tags} />
			<FormGroup>
				<Button wide onClick={onSubmit} isLoading={isLoading}>Save changes</Button>
			</FormGroup>
		</div>
	)
}

function CodeAndName({ onChange, icon, code, name }) {
	return (
		<div className="icon-name-abbreviation">
			<FormGroup label="Icon" className="icon-group">
					<IconPicker onChange={onChange} icon={icon} />
			</FormGroup>
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

function Category({ onChange, category}) {
	return (
		<FormGroup label="Category">
			<ProcessCategoryPicker onChange={e => onChange(e.key, "category")} category={category} />
		</FormGroup>
	)
}

function TagSelect({ onChange, tags }) {
	const tagNames = tags.map(t => t.name)
	return (
		<FormGroup label="Tags">
			<Select 
				mode="tags"
				size="large"
				style={{ width: '100%' }}
				placeholder="Select Tags"
				defaultValue={tagNames}
				onChange={ e => {
					const formatted = []
					e.forEach(tagName => {
						formatted.push({'name': tagName})
					})
					onChange(formatted, 'tags')
				}}
			/>
		</FormGroup>
	)
}
